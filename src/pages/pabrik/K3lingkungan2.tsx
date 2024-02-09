import {
  Container,
  Title,
  useMantineTheme,
  Text,
  Group,
  Image,
  Flex,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Variants, motion } from "framer-motion";

const animationVariants: Variants = {
  offscreen: { scale: 0.5, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.3 },
  },
};

export default function K3lingkungan() {
  const theme = useMantineTheme();
  const ismobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationVariants}
      >
        <Container
          pt="xl"
          pb="xl"
          c={theme.colors.green[9]}
          style={{ textAlign: "justify" }}
        >
          <Title ta="center" pb="xl">
            Program
          </Title>

          <Flex gap={20} direction={ismobile ? "column" : "row"} align="center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src="https://kpi.co.id/public/upload/image/thumbs/dsc08237-1701762423.jpg"
                h={300}
                w={ismobile ? 200 : 500}
              />
            </motion.div>
            <Group>
              <Title ta="left" pb="md">
                K3 dan Lingkungan
              </Title>
              <Text c="dimmed">
                Pelaksanaan K3L adalah salah satu bentuk upaya untuk menciptakan
                lingkungan kerja yang aman, sehat dan sejahtera, bebas dari
                kecelakaan kerja dan penyakit akibat kerja, serta bebas dari
                pencemaran lingkungan menuju peningkatan produktivitas
                sebagaimana diamanatkan dalam Undang-Undang No.1 Tahun 1970
                tentang Keselamatan Kerja.
              </Text>
            </Group>
          </Flex>
          <Text c="dimmed" pt="md">
            PT Kaltim Parna Industri dalam menjalankan seluruh kegiatan pabrik
            telah menetapkan suatu prosedur terdokumentasi untuk menjelaskan
            perihal mekanisme identifikasi terhadap bahaya dan aspek lingkungan,
            penilaian dan pengendalian resiko dan dampak lingkungan yang dapat
            ditimbulkan maupun yang berpotensi dari proses-proses yang terdapat
            dalam pembuatan produk amoniak. Kegiatan seluruh personil yang
            memiliki hubungan kerja dengan PT Kaltim Parna Industri termasuk
            subkontraktor dan tamu diwajibkan untuk selalu mentaati peraturan
            yang berlaku di seluruh area kerja perusahaan dan semua peraturan
            perundangan yang berlaku serta persyaratan lain yang menjadi acuan
            dan atau standar nasional maupun Internasional terkait dengan mutu,
            keselamatan, kesehatan kerja dan lingkungan.
          </Text>
        </Container>
      </motion.div>
    </div>
  );
}
