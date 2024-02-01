import {
  Container,
  Title,
  useMantineTheme,
  Text,
  Group,
  Image,
} from "@mantine/core";
import { Variants, motion } from "framer-motion";

const animationVariants: Variants = {
  offscreen: { scale: 0.5, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.5 },
  },
};

export default function K3lingkungan() {
  const theme = useMantineTheme();
  return (
    <div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationVariants}
      >
        <Container pt="xl" pb="xl" c={theme.colors.green[9]}>
          <Title ta="center">K3 dan Lingkungan</Title>
          <Group
            gap="XL"
            pt="xl"
            c="dimmed"
            style={{ textAlign: "justify" }}
            justify="center"
          >
            <Text>
              Pelaksanaan K3L adalah salah satu bentuk upaya untuk menciptakan
              lingkungan kerja yang aman, sehat dan sejahtera, bebas dari
              kecelakaan kerja dan penyakit akibat kerja, serta bebas dari
              pencemaran lingkungan menuju peningkatan produktivitas sebagaimana
              diamanatkan dalam Undang-Undang No.1 Tahun 1970 tentang
              Keselamatan Kerja.
            </Text>

            <Text>
              Kecelakaan kerja bukan hanya menimbulka korban jiwa maupun
              kerugian material bagi pekerja dan pengusaha, tetapi dapat juga
              mengganggu proses produksi secara menyeluruh dan merusak
              lingkungan yang akhirnya berdampak kepada masyarakat luas.
            </Text>

            <Text>
              PT Kaltim Parna Industri dalam menjalankan seluruh kegiatan pabrik
              telah menetapkan suatu prosedur terdokumentasi untuk menjelaskan
              perihal mekanisme identifikasi terhadap bahaya dan aspek
              lingkungan, penilaian dan pengendalian resiko dan dampak
              lingkungan yang dapat dinimbulkan maupun yang berpotensi dari
              proses-proses yang terdapat dalam pembuatan produk amoniak.
            </Text>

            <Text>
              Kegiatan seluruh personil yang memiliki hubungan kerja dengan PT
              Kaltim Parna Industri terasuk subkontraktor dan tamu diberikan
              informasi serta diwajibkan untuk selalu mentaati peraturan yang
              berlaku di PT Kaltim Parna Industri dan semua peraturan
              perundangan yang berlaku serta persyaratan lain yang menjadi acuan
              dan atau standar nasional maupun Internasional terkait dengan
              mutu, keselamatan, kesehatan kerja dan lingkungan.
            </Text>
            <motion.div
              whileHover={{ scale: 1.5 }}
              transition={{
                duration: 0.8,
                scale: {
                  type: "spring",
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            >
              <Image
                src="https://kpi.co.id/public/upload/image/thumbs/dsc08237-1701762423.jpg"
                height={400}
                mt="xl"
              />
            </motion.div>
          </Group>
        </Container>
      </motion.div>
    </div>
  );
}
