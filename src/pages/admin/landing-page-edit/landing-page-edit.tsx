import {
  AppShell,
  Burger,
  Container,
  Group,
  Tabs,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../../component/Navbar/Navbar";

export default function landingpageedit() {
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
          {/* <Image src={kpiLogo} w={50} /> */}
          <Title c={theme.colors.green[9]} order={4}>
            PT. KALTIM PARNA INDUSTRI
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <div>
          <Container size="default" pt="xl">
            <Tabs
              variant="pills"
              radius="xl"
              defaultValue="Beranda"
              color={theme.colors.green[9]}
            >
              <Tabs.List justify="start">
                <Tabs.Tab value="Beranda">Beranda</Tabs.Tab>
                <Tabs.Tab value="Sejarah">Sejarah</Tabs.Tab>
                <Tabs.Tab value="Tentang Perusahaan">
                  Tentang Perusahaan
                </Tabs.Tab>
                <Tabs.Tab value="Tentang Pabrik">Tentang Pabrik</Tabs.Tab>
                <Tabs.Tab value="Sertifikat">Tentang Pabrik</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="Beranda" c={theme.colors.green[9]}>
                <form>
                  <Text ta="center" fw={700}>
                    Top Page
                  </Text>
                  <Textarea radius="md" label="Deskripsi" />
                  <Text ta="center" fw={700}>
                    Visi Misi
                  </Text>
                  <Textarea radius="md" label="Visi" />
                  <Textarea radius="md" label="Misi" />
                  <Textarea radius="md" label="Budaya Kerja" />
                </form>
              </Tabs.Panel>
              <Tabs.Panel value="Sejarah">Sejarah tab content</Tabs.Panel>
              <Tabs.Panel value="Tentang Perusahaan">
                Tentang Perusahaan tab content
              </Tabs.Panel>
              <Tabs.Panel value="Tentang Pabrik">
                Tentang pabrik tab content
              </Tabs.Panel>
            </Tabs>
          </Container>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
