import {
  Container,
  Timeline,
  TimelineItem,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Variants, motion } from "framer-motion";

const proses = [
  {
    step: "Persiapan Awal",
    desc: "Buang kandungan sulfur dari gas alam karena dapat meracuni katalis di unit primary reformer",
  },
  {
    step: "Pemecahan Rantai Karbon",
    desc: "Gas alam dipecahkan di unit primary reformer dan secondary reformer untuk mendapatkan kandungan hidrogen",
  },
  {
    step: "Penyertakan Nitrogen",
    desc: " Nitrogen dari udara disertakan dalam aliran gas dari unit secondary reformer",
  },
  {
    step: "Pemurnian Gas",
    desc: "Gas alam yang masih mengandung CO dan CO2 dilewatkan ke unit removal untuk pemurnian",
  },
  {
    step: "Reaksi di Methanator",
    desc: "Karbon monoksida dan karbon dioksida yang tersisa direaksikan kembali di methanator untuk memastikan gas yang masuk ke reaktor amoniak benar-benar murni.",
  },

  {
    step: "Reaksi Amoniak",
    desc: "Dengan komposisi hidrogen dan nitrogen 3:1, amoniak (NH3) terbentuk di reaktor amoniak",
  },
  {
    step: "Amoniak Sintesis dan Refrigerasi",
    desc: "Melalui proses sintesis dan refrigerasi, amoniak dihasilkan dalam bentuk cair",
  },
  {
    step: "Penyimpanan",
    desc: "Amoniak cair disimpan dalam tangki khusus pada suhu -33°C",
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
export default function Skemaproses() {
  const theme = useMantineTheme();
  const prosesItems = proses.map((proses) => {
    return (
      <TimelineItem>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
        >
          <Text color={theme.colors.green[9]}>{proses.step}</Text>
          <Text c="dimmed">{proses.desc}</Text>
        </motion.div>
      </TimelineItem>
    );
  });
  return (
    <div>
      <Container pt="xl" c={theme.colors.green[9]}>
        <Title ta="center" pb="xl">
          Skema Proses Produksi
        </Title>
        <Timeline active={8} color={theme.colors.green[9]}>
          {prosesItems}
        </Timeline>
      </Container>
    </div>
  );
}
