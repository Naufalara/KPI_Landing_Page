import {
  Container,
  Image,
  Title,
  useMantineTheme,
  Text,
  Group,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Variants, motion } from "framer-motion";

const xVariants: Variants = {
  offscreen: {
    x: -200,
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

export default function Emergency() {
  const theme = useMantineTheme();
  const ismobile = useMediaQuery(`(max-width: 750px)`);
  return (
    <>
      <Container mt="xl" mb="xl">
        <Flex gap={20} direction={ismobile ? "column" : "row"} align="center">
          <Group>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={xVariants}
            >
              <Title c={theme.colors.green[9]} ta={ismobile ? "left" : "right"}>
                Emergency Response Team
              </Title>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={xVariants}
            >
              <Text c="dimmed" style={{ textAlign: "justify" }} pt="sm">
                PT Kaltim Parna Industri merupakan asset yang dalam
                operasionalnya perlu dijaga dan dilindungi dari kemungkinan
                terjadi kebakaran, peledakan, kecelakaan kerja, pencemaran
                lingkungan, dan kejadian-kejadian yang dapat merugikan. Untuk
                menanggulangi hal tersebut PT Kaltim Parna Industri membentuk
                tim khusus yaitu Emergency Response Team (ERT).
              </Text>
            </motion.div>
          </Group>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="https://kpi.co.id/public/upload/image/thumbs/2-ert-1701762402.jpg"
              h={300}
              w={ismobile ? "40vh" : 500}
            />
          </motion.div>
        </Flex>
      </Container>
    </>
  );
}
