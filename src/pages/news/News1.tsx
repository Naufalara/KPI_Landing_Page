import {
  Anchor,
  Card,
  Center,
  Container,
  Flex,
  Image,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import classes from "./News.module.css";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll";
// import { animateScroll } from "react-scroll";

interface beritaItems {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  foto: string;
}

export default function news1() {
  const theme = useMantineTheme();
  const [textnews, setText] = useState<beritaItems[]>([]);

  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/news/` + id)
      .then((response) => {
        setText(response.data);
        console.log(response.data);
        scrollToTop;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const text = textnews;

  const items = text.map((item) => {
    const desc = item.deskripsi;
    return (
      <Card shadow="xl" padding="xl" component="a" radius="xl">
        <Container size="lg">
          <Flex direction="column"></Flex>
          <Image src={item.foto} />
          <Title c={theme.colors.green[9]} pt="xl">
            {item.judul}
          </Title>
          <Text c="dimmed" size="sm">
            {item.tanggal}
          </Text>
          {/* <div>{item.deskripsi}</div> */}
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: desc }} />
          </TypographyStylesProvider>
        </Container>
      </Card>
    );
  });

  return (
    <div>
      <Container size="xl" className={classes.body} pt="15vh">
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
