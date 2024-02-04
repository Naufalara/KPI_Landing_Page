import {
  Card,
  Center,
  Container,
  SimpleGrid,
  Title,
  Text,
  Image,
  Group,
  useMantineTheme,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Variants, motion } from "framer-motion";

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

const galeriwana = [
  {
    src: "https://kpi.co.id/public/upload/image/gazebo-compressed-1623392776.jpg",
    label: "Gazebo Wana Khatulistiwa",
  },
  {
    src: "https://kpi.co.id/public/upload/image/gazebo-oct161-1623392802.jpg",
    label: "Gazebo Wana Khatulistiwa-2",
  },
  {
    src: "https://kpi.co.id/public/upload/image/hk-oct16-a-1623392821.jpg",
    label: "Jalan Setapak",
  },
  {
    src: "https://kpi.co.id/public/upload/image/hk-oct16-b-1623392843.jpg",
    label: "Tangki Air",
  },
  {
    src: "https://kpi.co.id/public/upload/image/wana-khatulistiwa2-2019-1623392921.jpg",
    label: "Gapura Wana Khatulistiwa",
  },
  {
    src: "https://kpi.co.id/public/upload/image/hk-oct16-d-1623392950.jpg",
    label: "Papan Nama Wana Khatulistiwa",
  },
  {
    label: "Pemeriksaan Hb, Test Kebugaran Siswa/i SMPN 4 Galilea Bontang",
  },
  {
    label: "KolakPisang-1",
  },
  {
    label: "KolakPisang-2",
  },
  {
    label: "KolakPisang-3",
  },
];

export default function Galeri() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const theme = useMantineTheme();
  const items = galeriwana.map((galeriwana) => {
    return (
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <div>
          <Card shadow="sm" padding="lg" radius="xl" withBorder>
            <Card.Section component="a">
              <Image
                src={galeriwana.src}
                fit="cover"
                height={isMobile ? 250 : 350}
              />
            </Card.Section>

            <Group
              justify="center"
              mt="md"
              mb="xs"
              style={{ color: theme.colors.green[9] }}
            >
              <Text fw={700}>{galeriwana.label}</Text>
            </Group>
          </Card>
        </div>
      </motion.div>
    );
  });

  return (
    <div>
      <Container size="xl" pt="xl">
        <div>
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
            variants={cardVariants}
          >
            <Center>
              <div style={{ color: theme.colors.green[9] }}>
                <Title>Galeri Wanakhatulistiwa</Title>
              </div>
            </Center>
          </motion.div>
          <SimpleGrid cols={isMobile ? 1 : 3} spacing="xl" pt="xl">
            {items}
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
}
