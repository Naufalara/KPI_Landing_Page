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
  Stack,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconChevronDown,
  IconHome,
  IconClock,
  IconInfoCircle,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./HeaderMenu.module.css";
import kpiLogo from "../../../public/kpi_logo.png";
import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { link: "/", label: "Beranda", icon: <IconHome size={20} /> },
  { link: "/history", label: "Sejarah", icon: <IconClock size={20} /> },
  {
    label: "Tentang",
    links: [
      { link: "/perusahaan", label: "Perusahaan" },
      { link: "/pabrik", label: "Pabrik" },
    ],
    icon: <IconInfoCircle size={20} />,
  },
];

export function HeaderMenu() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [opened, { toggle }] = useDisclosure(false);
  const controls = useAnimation();
  const theme = useMantineTheme();

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

    const drawermenuItems = link.links?.map((drawerItem, index) => (
      <div key={drawerItem.link}>
        <a
          key={index}
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
                <Flex direction="row" gap="md" align="center">
                  {link.icon}
                  <Text size="md">{link.label}</Text>
                </Flex>
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
          <Flex direction="row" gap="md" align="center">
            {link.icon}
            <Text size="md">{link.label}</Text>
          </Flex>
        </UnstyledButton>
      </a>
    );
  });

  const burgerVariants: Variants = {
    ontap: {
      x: 0,
      opacity: 1,
    },
  };

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
            <Group visibleFrom="md" justify="space-between">
              <Anchor variant="color" href="/" underline="never">
                <Center inline pt={5}>
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
              </Anchor>

              {items}

              <Stack align="center">
                <Text c={theme.colors.green[9]} fw={700} pt="sm">
                  Social Media
                </Text>
                <Group justify="center">
                  <a
                    href="https://www.instagram.com/ptkpi_id/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ActionIcon
                      size={isMobile ? 50 : 40}
                      color={theme.colors.green[9]}
                      variant="subtle"
                    >
                      <IconBrandInstagram
                        style={{
                          width: rem(isMobile ? 40 : 40),
                          height: rem(isMobile ? 40 : 40),
                        }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pt-kaltim-parna-industri/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ActionIcon
                      size={isMobile ? 50 : 40}
                      color={theme.colors.green[9]}
                      variant="subtle"
                    >
                      <IconBrandLinkedin
                        style={{
                          width: rem(isMobile ? 40 : 40),
                          height: rem(isMobile ? 40 : 40),
                        }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCBIW_34hXxve6QgQyL-dogQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ActionIcon
                      size={isMobile ? 50 : 40}
                      color={theme.colors.green[9]}
                      variant="subtle"
                    >
                      <IconBrandYoutube
                        style={{
                          width: rem(isMobile ? 40 : 40),
                          height: rem(isMobile ? 40 : 40),
                        }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </a>
                </Group>
              </Stack>
            </Group>
            <motion.div>
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="md"
              />
            </motion.div>

            <Drawer
              radius="md"
              opened={opened}
              onClose={close}
              pt="xl"
              size="xs"
              position="right"
            >
              <motion.div
                key={1}
                initial={{ x: 200, opacity: 0 }}
                whileInView="ontap"
                variants={burgerVariants}
              >
                {drawerItems}
              </motion.div>
            </Drawer>
          </div>
        </Container>
      </header>
    </motion.header>
  );
}
