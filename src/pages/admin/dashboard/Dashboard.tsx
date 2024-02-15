import {
  Title,
  Container,
  Center,
  useMantineTheme,
  AppShell,
  Group,
  Burger,
  Image,
} from "@mantine/core";
import classes from "./Dashboard.module.css";
import { useDisclosure } from "@mantine/hooks";
import kpiLogo from "../../../../public/kpi_logo.png";
import { Navbar } from "../../../component/Navbar/Navbar";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={kpiLogo} w={50} />
          <Title c={theme.colors.green[9]} order={4}>
            PT. KALTIM PARNA INDUSTRI
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container>
          <Center className={classes.text} c={theme.colors.green[9]}>
            <Title>Selamat datang di halaman dashboard</Title>
          </Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
