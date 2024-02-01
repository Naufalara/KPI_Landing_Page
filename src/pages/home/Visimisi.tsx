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
import { useState } from "react";

export default function Visimisi() {
  const [ishover, setIshover] = useState(false);
  const [ishover2, setIshover2] = useState(false);
  const [ishover3, setIshover3] = useState(false);
  const theme = useMantineTheme();
  const [isTapped, setIsTapped] = useState(false);
  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  const titleVariants: Variants = {
    offscreen: {
      y: 300,
      opacity: 0,
    },
    onscreen: {
      y: -10,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const cardVariants: Variants = {
    offscreen: {
      y: 300,
      opacity: 0,
    },
    onscreen: {
      y: 30,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
    ontap: {
      scale: 0.9,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  const listItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
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
            variants={titleVariants}
          >
            <Center>
              <Title>Visi & Misi</Title>
            </Center>
          </motion.div>

          <SimpleGrid
            cols={{ xs: 1, sm: 1, md: 2, lg: 3 }} // Adjust the number of columns based on screen size
            pt={{ xs: "xl", md: "2xl" }} // Adjust the padding-top based on screen size
            className={classes.visimisi}
          >
            <motion.div
              className="card-container"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.6 }}
              variants={cardVariants}
              onHoverStart={() => setIshover(true)}
              onHoverEnd={() => setIshover(false)}
              whileHover={{ y: -30, scale: 1.2 }}
              whileTap="ontap"
              onTap={handleTap}
              layout
            >
              <div>
                <Stack align="center">
                  <IconBulb size="10rem" stroke={1.5} />
                  <Title order={2}>Visi</Title>
                  <center>
                    <motion.div
                      layout
                      initial="hidden"
                      animate={ishover || isTapped ? "visible" : "hidden"}
                      variants={listItemVariants}
                    >
                      <Text>
                        Perusahaan penghasil amoniak terefisien di dunia
                      </Text>
                    </motion.div>
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
              onHoverStart={() => setIshover2(true)}
              onHoverEnd={() => setIshover2(false)}
              whileHover={{ y: -30, scale: 1.2 }}
              whileTap="ontap"
              onTap={handleTap}
              layout
            >
              <div>
                <Stack align="center">
                  <IconTargetArrow size="10rem" stroke={1.5} />
                  <Title order={2}>Misi</Title>
                  <center>
                    <motion.div
                      layout
                      initial="hidden"
                      animate={ishover2 || isTapped ? "visible" : "hidden"}
                      variants={listItemVariants}
                    >
                      <Text>
                        Peduli akan kualitas, keselamatan, dan lingkungan (QSHE)
                        Fokus pada produktivitas dan kehandalan pabrik Menjadi
                        perusahan terbaik, dimana setiap karyawan bangga menjadi
                        bagian dari Perusahaan
                      </Text>
                    </motion.div>
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
              onHoverStart={() => setIshover3(true)}
              onHoverEnd={() => setIshover3(false)}
              whileHover={{ y: -30, scale: 1.2 }}
              whileTap="ontap"
              onTap={handleTap}
              layout
            >
              <div>
                <Stack align="center">
                  <FaGears size="10rem" />
                  <Title order={2}>Budaya Kerja</Title>
                  <Center>
                    <List>
                      <motion.div
                        initial="hidden"
                        animate={ishover3 || isTapped ? "visible" : "hidden"}
                        variants={listItemVariants}
                        layout
                      >
                        <List.Item>Berpengetahuan</List.Item>
                        <List.Item>Akuntabilitas</List.Item>
                        <List.Item>Integritas & Etika</List.Item>
                        <List.Item>Kerja Tim</List.Item>
                      </motion.div>
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
