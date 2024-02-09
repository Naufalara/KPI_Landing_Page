import {
  Group,
  Code,
  ScrollArea,
  Image,
  Container,
  Title,
  useMantineTheme,
  Center,
} from "@mantine/core";
import {
  IconNotes,
  IconGauge,
  IconAdjustments,
  IconLock,
} from "@tabler/icons-react";
import { LinksGroup } from "../LinksGroup/NavbarLinksGroup";
import kpiLogo from "../../../public/kpi_logo.png";
import classes from "./Navbar.module.css";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "News",
    icon: IconNotes,
    links: [{ label: "News Admin", link: "/news-admin" }],
  },
  {
    label: "Landing Page",
    icon: IconAdjustments,
    links: [{ label: "Edit", link: "/landing-page-edit" }],
  },
  {
    label: "Settings",
    icon: IconLock,
    links: [
      { label: "Account", link: "/accoount" },
      { label: "Logout", link: "/login" },
    ],
  },
];

export function Navbar() {
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <div>
      <Container>
        <nav className={classes.navbar}>
          <div className={classes.header}>
            <Group justify="space-between">
              <Image src={kpiLogo} w={50} />

              <Title c={theme.colors.green[9]}>PT. KALTIM PARNA INDUSTRI</Title>
              <Code fw={700}>v0.0.1</Code>
            </Group>
          </div>

          <ScrollArea className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
        </nav>
      </Container>
    </div>
  );
}
