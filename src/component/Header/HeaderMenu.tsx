import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Anchor,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./HeaderMenu.module.css";
import kpiLogo from "../../../public/kpi_logo.png";

const links = [
  { link: "/", label: "Beranda" },
  { link: "/history", label: "Sejarah" },
  {
    link: "",
    label: "Tentang",
    links: [
      { link: "/perusahaan", label: "Perusahaan" },
      { link: "/pabrik", label: "Pabrik" },
    ],
  },
  {
    link: "",
    label: "Learn",
    links: [
      { link: "/docs", label: "Amonia" },
      { link: "/safety_induction", label: "Safety Induction" },
      { link: "/community", label: "Community" },
    ],
  },

  { link: "/news", label: "Berita" },

  {
    link: "",
    label: "Program",
    links: [
      { link: "/csr", label: "CSR" },
      { link: "/akkpi", label: "AKKPI" },
      { link: "/giska", label: "Giska" },
    ],
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

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
                <span className={classes.linkLabel}>{link.label}</span>
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
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
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
                >
                  PT. Kaltim Parna Industri
                </Text>
              </Center>
            </div>
          </Anchor>
          <Group gap={10} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
