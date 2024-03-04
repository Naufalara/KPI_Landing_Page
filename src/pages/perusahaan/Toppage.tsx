import {
  Center,
  Container,
  Flex,
  Group,
  List,
  ListItem,
  RingProgress,
  Text,
  Title,
  em,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPointFilled } from "@tabler/icons-react";
import { Variants, motion } from "framer-motion";
import { DonutChart } from "@mantine/charts";

export const data = [
  { name: "PT Parna Raya", value: 90, color: "white" },
  { name: "Bapak Marihad Simon Simbolon", value: 10, color: "yellow.6" },
];

export default function Toppage() {
  const theme = useMantineTheme();
  const ismobile = useMediaQuery(`(max-width: ${em(750)})`);
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
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          transition={{ delay: 0.5 }}
        >
          <Container
            pb="xl"
            pt="xl"
            style={{ textAlign: "justify" }}
            c={theme.colors.green[9]}
          >
            <Text pb="md">
              {/* <motion.span>{displayText}</motion.span> */}
              PT Kaltim Parna Industri adalah salah satu perusahaan Penanaman
              Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous
              Ammonia di Indonesia.
            </Text>
            <Text pb="md">
              {/* <motion.span>{displayText}</motion.span> */}
              KPI dikelola secara profesional oleh putra-putri terbaik bangsa
              Indonesia dan berpedoman pada tata kelola korporasi yang baik,
              serta berperan dalam pembangunan ekonomi nasional.
            </Text>
            <Text>
              {/* <motion.span>{displayText}</motion.span> */}
              KPI mampu berkompetisi dalam skala regional maupun internasional
              dan berkomitmen untuk memberikan pelayanan terbaik kepada
              pelanggan
            </Text>
          </Container>
        </motion.div>
      </div>
      <div style={{ backgroundColor: theme.colors.green[9] }}>
        <Container pt="xl">
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

          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
            variants={cardVariants}
          >
            <Center>
              {/* <RingProgress
                m="xl"
                size={ismobile ? 100 : 300}
                thickness={ismobile ? 10 : 30}
                roundCaps
                sections={[
                  { value: 10, color: "yellow" },
                  { value: 90, color: "white" },
                ]}
              /> */}
              <DonutChart
                data={data}
                paddingAngle={20}
                thickness={30}
                size={250}
                m="xl"
              />
              <Group>
                <Flex direction="column">
                  <List>
                    <List.Item c="white" icon={<IconPointFilled />}>
                      <Text size="sm" c="white">
                        PT Parna Raya{" "}
                        <span style={{ fontWeight: 700 }}>90%</span>
                      </Text>
                    </List.Item>
                    <ListItem c="yellow.6" icon={<IconPointFilled />}>
                      <Text size="sm" c="white">
                        Bapak Marihad Simon Simbolon
                        <span style={{ fontWeight: 700 }}> 10%</span>
                      </Text>
                    </ListItem>
                  </List>
                </Flex>
              </Group>
            </Center>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
