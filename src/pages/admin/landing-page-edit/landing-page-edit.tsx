import {
  Container,
  Tabs,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import classes from "./landing-page-edit.module.css";

export default function landingpageedit() {
  const theme = useMantineTheme();
  return (
    <div>
      <Container pl={300} size="default" pt="xl">
        <Tabs
          variant="pills"
          radius="xl"
          defaultValue="Beranda"
          color={theme.colors.green[9]}
        >
          <Tabs.List justify="start">
            <Tabs.Tab value="Beranda">Beranda</Tabs.Tab>
            <Tabs.Tab value="Sejarah">Sejarah</Tabs.Tab>
            <Tabs.Tab value="Tentang Perusahaan">Tentang Perusahaan</Tabs.Tab>
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
  );
}
