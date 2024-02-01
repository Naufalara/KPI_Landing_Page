import classes from "./Pabrik.module.css";
import { Variants, motion } from "framer-motion";
import { Title, useMantineTheme } from "@mantine/core";
import Datafisik from "./Datafisik";
import Skemaproses from "./Skemaproses";
import K3lingkungan from "./K3lingkungan";
import Emergency from "./Emergency";
import EmergencyDrill from "./EmergencyDrill";

export default function Pabrik() {
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
          Tentang Pabrik
        </Title>
      </motion.div>
      <Datafisik />
      <Skemaproses />
      <K3lingkungan />
      <Emergency />
      <EmergencyDrill />
    </div>
  );
}
