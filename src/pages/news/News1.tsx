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
      <Card shadow="xl" padding="xl" component="a" withBorder radius="xl">
        <Container size="lg">
          <Flex direction="column">
            <Title ta="center" c={theme.colors.green[9]}>
              {item.title}
            </Title>
            <Text c="dimmed" ta="center" size="sm">
              {item.date}
            </Text>
          </Flex>
          <Image src="https://kpi.co.id/public/upload/image/thumbs/konten-1706165522.jpg"></Image>
        </Container>
        <Text style={{ textAlign: "justify" }} pt={40} size="md">
          {formattedDesc}
        </Text>
      </Card>
    );
  });

  return (
    <div>
      <Container size="xl" className={classes.body}>
        <Anchor href="/" color={theme.colors.green[9]}>
          <Center inline>
            <IconArrowNarrowLeft color={theme.colors.green[9]} />
            <Text ml="xs">Back to Home</Text>
          </Center>
        </Anchor>
        {items}
      </Container>
    </div>
  );
}
