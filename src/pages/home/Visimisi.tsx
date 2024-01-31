import {
  Center,
  Container,
  List,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Home.module.css";
import { IconBulb, IconTargetArrow } from "@tabler/icons-react";
import { FaGears } from "react-icons/fa6";
import { Variants, motion } from "framer-motion";

export default function Visimisi() {
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
      <Container size="xl">
        <div className={classes.body2}>
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          >
            <Center>
              <Title>Visi & Misi</Title>
            </Center>
          </motion.div>

          <SimpleGrid cols={3} pt="xl" className={classes.visimisi}>
            <motion.div
              className="card-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
            >
              <div>
                <Stack align="center">
                  <IconBulb size="10rem" stroke={1.5} />
                  <Title order={2}>Visi</Title>
                  <center>
                    <Text>
                      Perusahaan penghasil amoniak terefisien di dunia
                    </Text>
                  </center>
                </Stack>
              </div>
            </motion.div>

            <motion.div
              className="card-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <div>
                <Stack align="center">
                  <IconTargetArrow size="10rem" stroke={1.5} />
                  <Title order={2}>Misi</Title>
                  <center>
                    <Text>
                      Peduli akan kualitas, keselamatan, dan lingkungan (QSHE)
                      Fokus pada produktivitas dan kehandalan pabrik Menjadi
                      perusahan terbaik, dimana setiap karyawan bangga menjadi
                      bagian dari Perusahaan
                    </Text>
                  </center>
                </Stack>
              </div>
            </motion.div>

            <motion.div
              className="card-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.6 }}
              variants={cardVariants}
            >
              <div>
                <Stack align="center">
                  <FaGears size="10rem" />
                  <Title order={2}>Budaya Kerja</Title>
                  <Center>
                    <List>
                      <List.Item>Berpengetahuan</List.Item>
                      <List.Item>Akuntabilitas</List.Item>
                      <List.Item>integritas & Etika</List.Item>
                      <List.Item>Kerja Tim</List.Item>
                    </List>
                  </Center>
                </Stack>
              </div>
            </motion.div>
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
}
