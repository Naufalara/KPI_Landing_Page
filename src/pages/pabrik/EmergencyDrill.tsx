import { Container, Image, Title, useMantineTheme, Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function EmergencyDrill() {
  const theme = useMantineTheme();
  return (
    <>
      <motion.div style={{ backgroundColor: theme.colors.green[9] }}>
        <Container c="white" pt="xl" pb="xl">
          <Title ta="center">Emergency Drill</Title>
        </Container>
      </motion.div>

      <Container mt="xl" mb="xl">
        <motion.div transition={{ ease: "easeInOut", duration: 0.3 }}>
          <Image
            src="https://kpi.co.id/public/upload/image/thumbs/ert-2019-273-1701762387.jpg"
            height={400}
          />
        </motion.div>
        <Text c="dimmed" style={{ textAlign: "justify" }} pt="sm">
          Kegiatan pelatihan penanggulangan keadaan darurat (emergency drill) di
          PT Kaltim Parna Industri diatur dan dikelola oleh unit kerja QSHE
          secara terjadwal. Panitia Pembina Keselamatan dan Kesehatan Kerja
          (P2K3) dalam rangka meningkatkan dan mengembangkan upaya keselamatan
          dan kesehatan kerja diperusahaan dilakukan pembinaan terus menerus dan
          terarah melalui pembentukan P2K3.
        </Text>
      </Container>
    </>
  );
}
