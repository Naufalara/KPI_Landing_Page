import {
  Container,
  Image,
  List,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function Datafisik() {
  const theme = useMantineTheme();
  return (
    <div style={{ backgroundColor: theme.colors.green[9] }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
            <motion.div
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            >
              <Image
                src="https://kpi.co.id/public/upload/image/thumbs/img-3231a-1701762443.jpg"
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            </motion.div>
          </SimpleGrid>
        </Container>
      </motion.div>
    </div>
  );
}
