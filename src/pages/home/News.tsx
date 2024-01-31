import {
  Card,
  Container,
  Text,
  Image,
  Center,
  Title,
  Group,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import classes from "./Home.module.css";
import { Variants, motion } from "framer-motion";

const news = [
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/konten-1706165522.jpg",
    badge: "Berita",
    title: "Pelatihan Pengelolaan dan Packaging Taman Sehati Kampung MasRamLi",
    date: "Kamis, 25 Januari 2024",
    desc: "Pemberdayaan Masyarakat pada Program CSR PT KPI khususnya pada program KolaKPIsang sangat terlihat nyata. Salah satu program pemberdayaan Masyarakat terkait lingkungan dan Kesehatan terlihat pada kegiatan Pelatihan Pengelolaan dan Packaging Kemasan hasil Taman Sehati di Kampung MasRamLi (Masyarakat Sadar Lingkungan) yang berada di Rt.29 Kel. Gunung Telihan Kec. Bontang Barat.\n Setelah Launching Taman Sehati dan Masyarakat sudah menikmati hasil panennya, target selanjutnya adalah bagaimana meningkatkan ekonomi Masyarakat dengan hasil yang sudah didapat. Dengan mengundang narasumber dari Dinas Ketahanan Pangan, Pertanian dan Perikanan serta Dinas Koperasi, UKM dan Perdagangan Kota Bontang, Masyarakat diberikan pelatihan bagaimana cara mengelola dan melakukan packaging yang baik. Dengan Pendidikan dan pelatihan yang berkualitas dapat meningkatkan kesejahteraan Masyarakat dan menciptakan keberlanjutan dalam pengelolaan sumber daya alam sehingga menambah nilai tambah produk yang dihasilkan.\n Diharapkan dengan kegiatan ini Masyarakat meningkatkan wawasan Masyarakat dan dapat menciptakan komunitas yang lebih berkelanjutan dan sejahtera.",
    links: "news/1",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/picture78-1701762102.jpg",
    badge: "Berita",
    title:
      "Program Pembuatan PMT bagi Balita Stunting & Underweight (Kelas Balita dan Kelas Ibu Hamil)",
    date: "Rabu, 2 Agustus 2023",
    desc: "Masih dalam rangka untuk penurunan stunting di Kota Bontang khususnya di Kecamatan Bontang Barat, PT. KPI dengan program KolaKPIsang bekerjasama dengan Dinas Kesehatan Kota Bontang dan Puskesmas Bontang Barat mengadakan Kelas Balita (KeBal) dengan kegiatan Demo masak cemilan sehat dan bergizi dan Kelas Ibu Hamil (KeBuMi) dengan kegiatan sosialisasi “Makan tak mau, Anemia akan datang”. Kegiatan ini dilaksanakan di Puskesmas Bontang Barat dengan peserta 15 Ibu Hamil yang mengalami resiko tinggi KEK dan Anemia, serta 30 balita dan baduta stunting dan underweight yang merupakan sasaran intervensi dan penanganan stunting program PT. KPI di Kecamatan Bontang Barat.",
    links: "news/2",
  },
];

export default function News() {
  //   const autoplay = useRef(Autoplay({ delay: 2000 }));
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
  const items = news.map((link) => {
    return (
      <CarouselSlide>
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          href={link.links}
          withBorder
        >
          <Card.Section>
            <Image src={link.image} height={500} alt="No way!" fit="contain" />
          </Card.Section>
          <Group justify="space-between">
            <Text fw={500} size="lg" mt="md" className={classes.titlenews}>
              {link.title}
            </Text>
            <Badge color="red" variant="light">
              {link.badge}
            </Badge>
          </Group>
          <Text mt="xs" c="dimmed" size="sm">
            {link.date}
          </Text>
          <Text mt="xs" c="dimmed" size="sm" lineClamp={4}>
            {link.desc}
          </Text>
        </Card>
      </CarouselSlide>
    );
  });
  return (
    <div id="news">
      <Container className={classes.news} size="xl">
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={cardVariants}
        >
          <Center>
            <div style={{ color: theme.colors.green[9] }}>
              <Title pb={32}>News</Title>
            </div>
          </Center>
        </motion.div>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.4 }}
          variants={cardVariants}
        >
          <Carousel
            slideSize="70%"
            height={800}
            slideGap="md"
            controlsOffset="xl"
            controlSize={64}
            loop
            dragFree
            draggable={false}
            withIndicators
          >
            {items}
          </Carousel>
        </motion.div>
      </Container>
    </div>
  );
}
