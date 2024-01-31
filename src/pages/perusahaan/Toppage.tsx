import {
  Center,
  Container,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { DonutChart } from "@mantine/charts";
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
    <div style={{ backgroundColor: theme.colors.green[9] }}>
      <Container pb="xl">
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={cardVariants}
        >
          <Group c="white" pt="xl" justify="center">
            <Text fw={500} size="xl">
              Komposisi Pemegang Saham
            </Text>
          </Group>
        </motion.div>
        <Center>
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          >
            <DonutChart
              data={data}
              paddingAngle={20}
              thickness={30}
              size={250}
              m="xl"
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
  );
}
