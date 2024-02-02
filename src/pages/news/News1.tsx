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
// import { animateScroll } from "react-scroll";

export default function news1() {
  const theme = useMantineTheme();

  return (
    <div>
      <Container size="xl" className={classes.body}>
        <Anchor href="/" color={theme.colors.green[9]}>
          <Center inline>
            <IconArrowNarrowLeft color={theme.colors.green[9]} />
            <Text ml="xs">Back to Home</Text>
          </Center>
        </Anchor>
        <Card shadow="xl" padding="xl" component="a" withBorder radius="xl">
          <Container size="lg">
            <Flex direction="column">
              <Title ta="center" c={theme.colors.green[9]}>
                Pelatihan Pengelolaan dan Packaging Taman Sehati Kampung
                MasRamLi
              </Title>
              <Text c="dimmed" ta="center" size="sm">
                Kamis, 25 Januari 2024
              </Text>
            </Flex>
            <Image src="https://kpi.co.id/public/upload/image/thumbs/konten-1706165522.jpg"></Image>
          </Container>
          <Text style={{ textAlign: "justify" }} pt={40} size="md">
            Pemberdayaan Masyarakat pada Program CSR PT KPI khususnya pada
            program KolaKPIsang sangat terlihat nyata. Salah satu program
            pemberdayaan Masyarakat terkait lingkungan dan Kesehatan terlihat
            pada kegiatan Pelatihan Pengelolaan dan Packaging Kemasan hasil
            Taman Sehati di Kampung MasRamLi (Masyarakat Sadar Lingkungan) yang
            berada di Rt.29 Kel. Gunung Telihan Kec. Bontang Barat.\n Setelah
            Launching Taman Sehati dan Masyarakat sudah menikmati hasil
            panennya, target selanjutnya adalah bagaimana meningkatkan ekonomi
            Masyarakat dengan hasil yang sudah didapat. Dengan mengundang
            narasumber dari Dinas Ketahanan Pangan, Pertanian dan Perikanan
            serta Dinas Koperasi, UKM dan Perdagangan Kota Bontang, Masyarakat
            diberikan pelatihan bagaimana cara mengelola dan melakukan packaging
            yang baik. Dengan Pendidikan dan pelatihan yang berkualitas dapat
            meningkatkan kesejahteraan Masyarakat dan menciptakan keberlanjutan
            dalam pengelolaan sumber daya alam sehingga menambah nilai tambah
            produk yang dihasilkan.\n Diharapkan dengan kegiatan ini Masyarakat
            meningkatkan wawasan Masyarakat dan dapat menciptakan komunitas yang
            lebih berkelanjutan dan sejahtera.
          </Text>
        </Card>
      </Container>
    </div>
  );
}
