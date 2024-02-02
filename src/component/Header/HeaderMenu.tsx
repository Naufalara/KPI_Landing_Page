import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Anchor,
  Text,
  Drawer,
  em,
  UnstyledButton,
  Collapse,
  Flex,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./HeaderMenu.module.css";
import kpiLogo from "../../../public/kpi_logo.png";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { link: "/", label: "Beranda" },
  { link: "/history", label: "Sejarah" },
  {
    label: "Tentang",
    links: [
      { link: "/perusahaan", label: "Perusahaan" },
      { link: "/pabrik", label: "Pabrik" },
    ],
  },
  {
    label: "Learn",
    links: [
      { link: "/docs", label: "Amonia" },
      { link: "/safety_induction", label: "Safety Induction" },
      { link: "/community", label: "Community" },
    ],
  },

  { link: "/news", label: "Berita" },

  {
    label: "Program",
    links: [
      { link: "/csr", label: "CSR" },
      { link: "/akkpi", label: "AKKPI" },
      { link: "/giska", label: "Giska" },
    ],
  },
];

export function HeaderMenu() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [opened, { toggle }] = useDisclosure(false);
  const controls = useAnimation();

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    controls.start({ opacity: isScrolled ? 0.3 : 1 });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <a href={item.link} className={classes.link}>
          {item.label}
        </a>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a href={link.link} className={classes.link}>
              <Center>
                <UnstyledButton className={classes.linkLabel}>
                  <Text size="sm" fw={500}>
                    {link.label}
                  </Text>
                </UnstyledButton>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a key={link.label} href={link.link} className={classes.link}>
        <UnstyledButton>
          <Text size="sm" fw={500}>
            {link.label}
          </Text>
        </UnstyledButton>
      </a>
    );
  });

  const drawerItems = links.map((link) => {
    const [isOpen, setIsOpen] = useState(false);

    const drawermenuItems = link.links?.map((drawerItem) => (
      <div key={drawerItem.link}>
        <a
          href={drawerItem.link}
          className={classes.link}
          onClick={() => {
            close(); // close the Drawer when an item is clicked
            setIsOpen(false); // close the specific Collapse for this item
          }}
        >
          {drawerItem.label}
        </a>
      </div>
    ));

    if (drawermenuItems) {
      return (
        <>
          <a href={link.link} className={classes.link}>
            <Flex key={link.label} direction="row" align="center">
              <UnstyledButton onClick={() => setIsOpen(!isOpen)}>
                <Text>{link.label}</Text>
              </UnstyledButton>
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Flex>
          </a>
          <Container pl="md">
            <Collapse in={isOpen}>
              <UnstyledButton
                className={classes.linkLabel}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Text size="sm" fw={500}>
                  {drawermenuItems}
                </Text>
              </UnstyledButton>
            </Collapse>
          </Container>
        </>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={close}
      >
        <UnstyledButton>
          <Text>{link.label}</Text>
        </UnstyledButton>
      </a>
    );
  });

  return (
    <motion.header
      animate={isMobile ? "none" : controls}
      initial={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => controls.start({ opacity: 1 })}
      className={classes.header}
    >
      <header>
        <Container size="xl">
          <div className={classes.inner}>
            <Anchor variant="color" href="/" underline="never">
              <div style={{ display: "flex" }}>
                <Center inline>
                  <img src={kpiLogo} alt="KPI Logo" style={{ width: "32px" }} />
                  <Text
                    className={classes.logotext}
                    style={{
                      marginLeft: "10px",
                    }}
                    size="sm"
                    fw={500}
                  >
                    PT. Kaltim Parna Industri
                  </Text>
                </Center>
              </div>
            </Anchor>
            <Group gap={10} visibleFrom="sm">
              {items}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
            <Drawer
              radius="md"
              opened={opened}
              onClose={close}
              pt="xl"
              size="xs"
              position="right"
            >
              {drawerItems}
            </Drawer>
          </div>
        </Container>
      </header>
    </motion.header>
  );
}
