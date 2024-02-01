import { Container, Image, Title, useMantineTheme, Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function Emergency() {
  const theme = useMantineTheme();
  return (
    <>
      <motion.div style={{ backgroundColor: theme.colors.green[9] }}>
        <Container c="white" pt="xl" pb="xl">
          <Title ta="center">Emergency Respond Team</Title>
        </Container>
      </motion.div>

      <Container mt="xl" mb="xl">
        <motion.div transition={{ ease: "easeInOut", duration: 0.3 }}>
          <Image
            src="https://kpi.co.id/public/upload/image/thumbs/2-ert-1701762402.jpg"
            height={400}
          />
        </motion.div>
        <Text c="dimmed" style={{ textAlign: "justify" }} pt="sm">
          PT Kaltim Parna Industri merupakan asset yang dalam operasionalnya
          perlu dijaga dan dilindungi dari kemungkinan terjadi kebakaran,
          peledakan, kecelakaan kerja dan pencemaran lingkungan, dan
          kejadian-kejadian yang dapat merugikan. Untuk menanggulangi hal
          tersebut PT Kaltim Parna Industri membentuk tim khusus yaitu Emergency
          Response Team (ERT).
        </Text>
      </Container>
    </>
  );
}
