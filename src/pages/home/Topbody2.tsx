import {
  Button,
  Center,
  Container,
  Spoiler,
  Title,
  em,
  rem,
  Text,
} from "@mantine/core";
import { Link } from "react-scroll";
import classes from "./Home.module.css";
import {
  Variants,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

export default function Topbody() {
  const baseText =
    "PT Kaltim Parna Industri adalah salah satu perusahaan Penanaman Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous Ammonia di Indonesia. KPI dikelola secara profesional oleh putra-putri terbaik bangsa Indonesia dan berpedoman pada tata kelola korporasi yang baik, serta berperan dalam pembangunan ekonomi nasional. KPI mampu berkompetisi dalam skala regional maupun internasional dan berorientasi pada kepentingan pelanggan serta berkomitmen untuk memberikan pelayanan terbaik kepada pelanggan" as string;

  // const baseText =
  //   "PT Kaltim Parna Industri (KPI) adalah salah satu perusahaan Penanaman Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous Ammonia di Indonesia. KPI dikelola secara profesional oleh putra-putri terbaik bangsa Indonesia dan berpedoman pada tata kelola korporasi yang baik, serta berperan dalam pembangunan ekonomi nasional. KPI mampu berkompetisi dalam skala regional maupun internasional dan berorientasi pada kepentingan pelanggan serta berkomitmen untuk memberikan pelayanan terbaik kepada pelanggan" as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      duration: 2,
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
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [onhover, setOnhover] = useState(false);

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
            <Title
              order={3}
              className={classes.title}
              pt={isMobile ? rem(50) : rem(200)}
            >
              {/* PT Kaltim Parna Industri */}
            </Title>
            <Spoiler
              maxHeight={120}
              showLabel="Show more"
              hideLabel="Hide"
              pb="md"

              // fw={700}
            >
              <span></span>
            </Spoiler>
            <Text className={classes.text} pb="md">
              {/* <motion.span>{displayText}</motion.span> */}
              PT Kaltim Parna Industri adalah salah satu perusahaan Penanaman
              Modal Dalam Negeri (PMDN) terbesar yang memproduksi Anhydrous
              Ammonia di Indonesia.
            </Text>
            <Text className={classes.text} pb="md">
              {/* <motion.span>{displayText}</motion.span> */}
              KPI dikelola secara profesional oleh putra-putri terbaik bangsa
              Indonesia dan berpedoman pada tata kelola korporasi yang baik,
              serta berperan dalam pembangunan ekonomi nasional.
            </Text>
            <Text className={classes.text}>
              {/* <motion.span>{displayText}</motion.span> */}
              KPI mampu berkompetisi dalam skala regional maupun internasional
              dan berkomitmen untuk memberikan pelayanan terbaik kepada
              pelanggan
            </Text>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            <Button
              variant={onhover ? "outline" : "gradient"}
              gradient={{ from: "green", to: "cyan", deg: 78 }}
              color="white"
              size="md"
              radius="xl"
            >
              <motion.div
                onHoverStart={() => setOnhover(true)}
                onHoverEnd={() => setOnhover(false)}
              >
                <Center>
                  <Link
                    to="visimisi"
                    smooth={true}
                    duration={500}
                    offset={isMobile ? -50 : -200}
                  >
                    Baca Selengkapnya
                  </Link>
                  <IconChevronDown />
                </Center>
              </motion.div>
            </Button>
          </motion.div> */}
        </div>
      </Container>
    </div>
  );
}
