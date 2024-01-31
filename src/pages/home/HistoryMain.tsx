import {
  Anchor,
  Button,
  Container,
  Text,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect } from "react";
import { Variants, motion } from "framer-motion";

const history = [
  {
    date: "17 Juli 1995",
    desc: "PT KPI didirikan dengan Akta Notaris No.97 Tahun 1995 oleh PT. Parna Raya & YKHT",
  },
  {
    date: "13 Februari 1996",
    desc: "Pemerintah melalui Kementerian Hukum dan HAM mengesahkan Akta Pendirian No. 97 Tahun 1995",
  },
  {
    date: "26 September 1997",
    desc: "Perjanjian Kerja Sama yang ditandatangani oleh PT. Parna Raya, YKHT & Mitsubishi Corp",
  },
];

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

export default function HistoryMain() {
  const theme = useMantineTheme();

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    const topElement = document.getElementById("top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const historyItems = history.map((history) => {
    return (
      <Timeline.Item>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardVariants}
        >
          <Container size="default">
            <Text fw={700} color={theme.colors.green[9]}>
              {history.date}
            </Text>
            <Text c="dimmed">{history.desc}</Text>
          </Container>
        </motion.div>
      </Timeline.Item>
    );
  });

  return (
    <>
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={cardVariants}
      >
        <Container size="xs">
          <Title ta="center" pb="xl" c={theme.colors.green[9]}>
            Sejarah
          </Title>
          <Timeline active={3} color={theme.colors.green[9]}>
            {historyItems}
          </Timeline>
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.0 }}
            variants={cardVariants}
          >
            <Button fullWidth color={theme.colors.green[9]}>
              <Anchor underline="never" c="white" href="/history">
                Lihat selengkapnya
              </Anchor>
            </Button>
          </motion.div>
        </Container>
      </motion.div>
    </>
  );
}
