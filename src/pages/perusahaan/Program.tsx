import {
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Stepper,
  Text,
  Title,
  em,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Variants, motion } from "framer-motion";

export default function Program() {
  const ismobile = useMediaQuery(`(max-width: ${em(750)})`);
  const theme = useMantineTheme();
  const cardVariants: Variants = {
    offscreen: {
      y: 300,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <div>
      <Container pb="xl">
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Container c={theme.colors.green[9]} pb="xl">
            <Flex
              gap={20}
              direction={ismobile ? "column" : "row"}
              // align="center"
            >
              <Image
                src="https://kpi.co.id/public/upload/image/csr-1.jpg"
                h={300}
                w={ismobile ? 200 : 500}
              />
              <Stack>
                <Title>Program Penghijauan dan Lingkungan</Title>
                <Text>
                  Konsep dasar program ini adalah memupuk kesadaran sekaligus
                  perilaku nyata masyarakat mengenai betapa pentingnya
                  melestarikan lingkungan hidup.
                </Text>
              </Stack>
            </Flex>
          </Container>
        </motion.div>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Container pt="xl" c={theme.colors.green[9]} pb="xl">
            <Flex
              gap={20}
              direction={ismobile ? "column-reverse" : "row"}
              // align="center"
            >
              <Stack>
                <Title ta={ismobile ? "left" : "right"}>
                  Program Pendidikan dan Pelatihan
                </Title>
                <Text ta={ismobile ? "left" : "right"}>
                  Pendidikan merupakan jembatan penting menuju kesejahteraan.
                  Sayangnya, keterbatasan ekonomi seringkali menjadi penyebab
                  utama bagi masyarakat sehingga kurang memperhatikan
                  pendidikan.
                </Text>
              </Stack>
              <Image
                src="https://kpi.co.id/public/upload/image/csr-2.jpg"
                h={300}
                w={ismobile ? 200 : 500}
              />
            </Flex>
          </Container>
        </motion.div>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Container pt="xl" c={theme.colors.green[9]} pb="xl">
            <Flex
              gap={20}
              direction={ismobile ? "column" : "row"}
              // align="center"
            >
              <Image
                src="https://kpi.co.id/public/upload/image/wana-khatulistiwa2-2019-1623392921.jpg"
                h={300}
                w={ismobile ? 200 : 500}
              />
              <Stack>
                <Title ta={ismobile ? "left" : "left"}>
                  Hutan Kota Wana Khatulistiwa
                </Title>
                <Text ta={ismobile ? "left" : "left"}>
                  Wana Khatulistiwa, lahan seluas 8 ha yang dikelola oleh KPI
                  sejak 2012 dengan koleksi tanaman yang variatif sebanyak
                  kurang lebih 4.500 pohon termasuk Bangkirai, Ulin, Gaharu,
                  Pulai, Meranti, Mahoni, dan buah-buahan lokal. Perawatan
                  tanaman dilakukan secara berkala oleh petugas, termasuk
                  infrastruktur sumur, penyimpanan air bersih, serta Gazebo yang
                  dimanfaatkan sebagai tempat belajar ekstrakurikuler siswa
                  tentang tanaman asli Kalimantan.
                </Text>
              </Stack>
            </Flex>
          </Container>
        </motion.div>
      </Container>
    </div>
  );
}
