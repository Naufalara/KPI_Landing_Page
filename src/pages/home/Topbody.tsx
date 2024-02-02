import { Container, Spoiler, Title } from "@mantine/core";
import classes from "./Home.module.css";
import {
  Variants,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export default function Topbody() {
  const baseText =
    "PT Kaltim Parna Industri (KPI) adalah salah satu perusahaan Penanaman Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous Ammonia di Indonesia" as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      duration: 5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  const cardVariants: Variants = {
    offscreen: {
      x: -300,
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
        <div className={classes.container}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
            variants={cardVariants}
            className={classes.motionDiv}
          >
            <Title order={1} className={classes.title}>
              PT. Kaltim Parna Industri
            </Title>
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              <span className={classes.text}>
                <motion.span>{displayText}</motion.span>
              </span>
            </Spoiler>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
