import {
  Container,
  Image,
  Title,
  useMantineTheme,
  Text,
  Flex,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Variants, motion } from "framer-motion";

const xVariants: Variants = {
  offscreen: {
    x: 200,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
export default function EmergencyDrill() {
  const theme = useMantineTheme();
  const ismobile = useMediaQuery(`(max-width: 750px)`);
  return (
    <>
      <Container pt="xl" pb="xl">
        <Flex
          gap={20}
          direction={ismobile ? "column-reverse" : "row"}
          align="center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="https://kpi.co.id/public/upload/image/thumbs/ert-2019-273-1701762387.jpg"
              h={300}
              w={ismobile ? "40vh" : 500}
            />
          </motion.div>
          <Group>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={xVariants}
            >
              <Title ta="left" c={theme.colors.green[9]}>
                Emergency Drill
              </Title>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={xVariants}
            >
              <Text c="dimmed" style={{ textAlign: "justify" }} pt="sm">
                Kegiatan pelatihan penanggulangan keadaan darurat (emergency
                drill) di PT Kaltim Parna Industri diatur dan dikelola oleh unit
                kerja QSHE secara terjadwal. Kegiatan Emergency Drill dilakukan
                dalam rangka meningkatkan dan mengembangkan upaya keselamatan
                dan kesehatan kerja di perusahaan yang dievaluasi secara berkala
                oleh tim Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3).
              </Text>
            </motion.div>
          </Group>
        </Flex>
      </Container>
    </>
  );
}
