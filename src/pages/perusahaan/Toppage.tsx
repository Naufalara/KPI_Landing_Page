import {
  Center,
  Container,
  Flex,
  Group,
  RingProgress,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import { Variants, motion } from "framer-motion";

export const data = [
  { name: "PT Parna Raya", value: 90, color: "white" },
  { name: "Bapak Marihad Simon Simbolon", value: 10, color: "yellow.6" },
];

export default function Toppage() {
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
    <>
      <div>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={cardVariants}
          transition={{ delay: 0.5 }}
        >
          <Container pb="xl" pt="xl" style={{ textAlign: "justify" }}>
            <Text c={theme.colors.green[9]}>
              PT Kaltim Parna Industri (KPI) adalah salah satu perusahaan
              Penanaman Modal Dalam Negeri (PMDN) terbesar yang memproduksi
              Anhydrous Ammonia di Indonesia. KPI dikelola secara profesional
              oleh putra-putri terbaik bangsa Indonesia dan berpedoman pada tata
              kelola korporasi yang baik, serta berperan dalam pembangunan
              ekonomi nasional. KPI mampu berkompetisi dalam skala regional
              maupun internasional dan berorientasi pada kepentingan pelanggan
              serta berkomitmen untuk memberikan pelayanan terbaik kepada
              pelanggan
            </Text>
          </Container>
        </motion.div>
      </div>
      <div style={{ backgroundColor: theme.colors.green[9] }}>
        <Container pb="xl" pt="xl">
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
            variants={cardVariants}
          >
            <Group c="white" justify="center">
              <Title ta="center">Komposisi Pemegang Saham</Title>
            </Group>
          </motion.div>
          <Center>
            <motion.div
              className="card-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0 }}
              variants={cardVariants}
            >
              <RingProgress
                m="xl"
                size={300}
                thickness={30}
                roundCaps
                sections={[
                  { value: 10, color: "yellow" },
                  { value: 90, color: "white" },
                ]}
              />
              <Group>
                <Flex direction="column">
                  <Group c="white">
                    <IconPointFilled />
                    <Text size="sm" c="white">
                      PT Parna Raya
                    </Text>
                  </Group>

                  <Group c="yellow.6">
                    <IconPointFilled />
                    <Text size="sm" c="white">
                      Bapak Marihad Simon Simbolon
                    </Text>
                  </Group>
                </Flex>
              </Group>
            </motion.div>
          </Center>
        </Container>
      </div>
    </>
  );
}
