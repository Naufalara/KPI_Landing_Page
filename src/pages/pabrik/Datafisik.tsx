import {
  Container,
  Image,
  List,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Text } from "@mantine/core";

export default function Datafisik() {
  const theme = useMantineTheme();
  return (
    <div style={{ backgroundColor: theme.colors.green[9] }}>
      <Container pt="xl" pb="xl" c="white">
        <Title ta="center">Data Fisik & Produk</Title>
        <SimpleGrid cols={2} spacing="xl" pt="xl">
          <div>
            <Text pt="md" pb="md">
              Produk yang dipasarkan oleh KPI secara komersial ialah Anyhdrous
              Ammonia. Istilah Anyhdrous Ammonia menunjukkan tidak adanya air
              pada bahan tersebut. Desain konsentrasi amoniak di KPI adalah
              99.90%, namun pada kenyataannya KPI berhasil membuat konsentrasi
              amoniak hingga 99.97%.
            </Text>
            <List>
              <List.Item>
                Lokasi Pabrik : Industrial Area PT Kaltim Industrial Estate
                Bontang, East Kalimantan, Indonesia
              </List.Item>
              <List.Item>
                Kontraktor : Mitsubishi Heavy Industries, LTD (Jepang)
              </List.Item>
              <List.Item>
                Lisensi Proses : Haldor Topsoe A / S (Denmark)
              </List.Item>
              <List.Item>
                Kapasitas Tangki Amoniak : 40,000 MT (bersih)
              </List.Item>
              <List.Item>Kapasitas Jetty Amoniak : 35,000 MT Ship</List.Item>
              <List.Item>Luas Area pabrik : 8 ±hektar</List.Item>
            </List>
          </div>
          <div>
            <Image src="https://kpi.co.id/public/upload/image/thumbs/img-3231a-1701762443.jpg" />
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
}
