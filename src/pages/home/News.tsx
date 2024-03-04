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
  em,
  TypographyStylesProvider,
} from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import classes from "./Home.module.css";
import { Variants, motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

interface beritaItems {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: string;
  foto: string;
}

export default function News() {
  const [berita, setberita] = useState<beritaItems[]>([]);
  useEffect(() => {
    api
      .get(`/showonlp`)
      .then((response) => {
        setberita(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const news = berita;
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
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

  const Navigate = useNavigate();

  const handleNewsOnClick = (id: number) => {
    Navigate("/news/" + id);
  };
  const items = news.map((link) => {
    return (
      <CarouselSlide key={link.id}>
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          onClick={() => handleNewsOnClick(link.id)}
        >
          <Card.Section className={classes.image}>
            <Image
              src={link.foto}
              alt="No way!"
              fit="cover"
              height={isMobile ? 150 : 400}
            />
          </Card.Section>

          <Text
            fw={500}
            size={isMobile ? "md" : "lg"}
            mt="md"
            className={classes.titlenews}
            c={theme.colors.green[9]}
          >
            {link.judul}
          </Text>

          <Group justify="space-between">
            <Text mt="xs" c="dimmed" size="sm">
              {link.tanggal}
            </Text>
            <Badge color={theme.colors.green[9]} variant="light">
              {link.kategori}
            </Badge>
          </Group>
          <Text mt="xs" c="dimmed" size="sm" lineClamp={isMobile ? 2 : 4}>
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: link.deskripsi }} />
            </TypographyStylesProvider>
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
          viewport={{ once: true, amount: 0 }}
          variants={cardVariants}
        >
          <Center>
            <div style={{ color: theme.colors.green[9] }}>
              <Title pb={32}>Berita</Title>
            </div>
          </Center>
        </motion.div>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0 }}
          variants={cardVariants}
        >
          <Carousel
            slideSize="70%"
            height={isMobile ? 500 : 800}
            slideGap="md"
            controlsOffset="xl"
            controlSize={64}
            withControls={!isMobile}
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
