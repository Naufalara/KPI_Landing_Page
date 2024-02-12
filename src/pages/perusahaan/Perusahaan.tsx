import { Title, useMantineTheme } from "@mantine/core";
import classes from "./Perusahaan.module.css";
import Toppage from "./Toppage";
import Program from "./Program";
import { Variants, motion } from "framer-motion";
import Galeri from "./Galeri";

export default function () {
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
    <div className={classes.body}>
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={cardVariants}
      >
        <Title ta="center" c={theme.colors.green[9]} pb="xl">
          Tentang Perusahaan
        </Title>
      </motion.div>
      <Toppage />
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={cardVariants}
      >
        <Title ta="center" c={theme.colors.green[9]} pb="xl" pt="xl">
          Program
        </Title>
      </motion.div>

      <Program />
      {/* <Wanakhatulistiwa /> */}
      <Galeri />
    </div>
  );
}
