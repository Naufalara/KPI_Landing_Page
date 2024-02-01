import { Container, Title } from "@mantine/core";
import classes from "./Home.module.css";
import {
  Variants,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import CursorBlinker from "../../component/CursorBlinker/CursorBlinker";
import { useEffect } from "react";

export default function Topbody() {
  const baseText =
    "PT Kaltim Parna Industri (KPI) adalah salah satu perusahaan Penanaman Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous Ammonia di Indonesia. KPI dikelola secara profesional oleh putra-putri terbaik bangsa Indonesia dan berpedoman pada tata kelola korporasi yang baik, serta berperan dalam pembangunan ekonomi nasional. KPI mampu berkompetisi dalam skala regional maupun internasional dan berorientasi pada kepentingan pelanggan serta berkomitmen untuk memberikan pelayanan terbaik kepada pelanggan" as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      duration: 7,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  const cardVariants: Variants = {
    offscreen: {
      x: -500,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "fadeIn",
        duration: 1,
      },
    },
  };

  return (
    <div className={classes.topbody}>
      <Container size="xl">
        <div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
            variants={cardVariants}
          >
            <Title order={1} className={classes.title}>
              PT. Kaltim Parna Industri
            </Title>

            <span className={classes.text}>
              <motion.span>{displayText}</motion.span>
            </span>
            <CursorBlinker />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
