import {
  Anchor,
  Card,
  Center,
  Container,
  Flex,
  Image,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import classes from "./News.module.css";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import React from "react";
// import { animateScroll } from "react-scroll";

const text = [
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/konten-1706165522.jpg",
    title: "Pelatihan Pengelolaan dan Packaging Taman Sehati Kampung MasRamLis",
    date: "Kamis, 25 Januari 2024",
    desc: "Pemberdayaan Masyarakat pada Program CSR PT KPI khususnya pada program KolaKPIsang sangat terlihat nyata. Salah satu program pemberdayaan Masyarakat terkait lingkungan dan Kesehatan terlihat pada kegiatan Pelatihan Pengelolaan dan Packaging Kemasan hasil Taman Sehati di Kampung MasRamLi (Masyarakat Sadar Lingkungan) yang berada di Rt.29 Kel. Gunung Telihan Kec. Bontang Barat. \n Setelah Launching Taman Sehati dan Masyarakat sudah menikmati hasil panennya, target selanjutnya adalah bagaimana meningkatkan ekonomi Masyarakat dengan hasil yang sudah didapat. Dengan mengundang narasumber dari Dinas Ketahanan Pangan, Pertanian dan Perikanan serta Dinas Koperasi, UKM dan Perdagangan Kota Bontang, Masyarakat diberikan pelatihan bagaimana cara mengelola dan melakukan packaging yang baik. Dengan Pendidikan dan pelatihan yang berkualitas dapat meningkatkan kesejahteraan Masyarakat dan menciptakan keberlanjutan dalam pengelolaan sumber daya alam sehingga menambah nilai tambah produk yang dihasilkan. \n Diharapkan dengan kegiatan ini Masyarakat meningkatkan wawasan Masyarakat dan dapat menciptakan komunitas yang lebih berkelanjutan dan sejahtera.",
  },
];

export default function news1() {
  const theme = useMantineTheme();

  const items = text.map((item) => {
    const formattedDesc = item.desc.split("\n").map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        <br />
      </React.Fragment>
    ));

    return (
      <Card shadow="xl" padding="xl" component="a" radius="xl">
        <Container size="lg">
          <Flex direction="column"></Flex>
          <Image src={item.image} />
          <Title c={theme.colors.green[9]} pt="xl">
            {item.title}
          </Title>
          <Text c="dimmed" size="sm">
            {item.date}
          </Text>
          <Text style={{ textAlign: "justify" }} pt="xl" size="md">
            {formattedDesc}
          </Text>
        </Container>
      </Card>
    );
  });

  return (
    <div>
      <Container size="xl" className={classes.body}>
        <Anchor href="/" color={theme.colors.green[9]}>
          <Center inline>
            <IconArrowNarrowLeft color={theme.colors.green[9]} />
            <Text ml="xs">Kembali ke Beranda</Text>
          </Center>
        </Anchor>
        {items}
      </Container>
    </div>
  );
}
