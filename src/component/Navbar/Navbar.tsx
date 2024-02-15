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
          <ScrollArea className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
        </nav>
      </Container>
    </div>
  );
}

// "use client";

// import { ActionIcon, Box, Drawer, Stack, TextInput } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { IconSearch, IconSettings } from "@tabler/icons-react";
// import classes from "./Navbar.module.css";
// import { DirectionSwitcher } from "../DirectionSwitcher/DirectionSwitcher";
// import Logo from "../../../public/kpi_logo.png";
// import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

// interface Props {
//   burger?: React.ReactNode;
// }

// export function Navbar({ burger }: Props) {
//   const [opened, { close, open }] = useDisclosure(false);

//   return (
//     <header className={classes.header}>
//       {burger && burger}
//       {/* <Logo /> */}
//       <Box style={{ flex: 1 }} />
//       <TextInput
//         placeholder="Search"
//         variant="filled"
//         leftSection={<IconSearch size="0.8rem" />}
//         style={{}}
//       />
//       <ActionIcon onClick={open} variant="subtle">
//         <IconSettings size="1.25rem" />
//       </ActionIcon>

//       <Drawer
//         opened={opened}
//         onClose={close}
//         title="Settings"
//         position="right"
//         transitionProps={{ duration: 0 }}
//       >
//         <Stack gap="lg">
//           <ThemeSwitcher />
//           <DirectionSwitcher />
//         </Stack>
//       </Drawer>
//     </header>
//   );
// }
