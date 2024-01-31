import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import image from "./image.svg";
import classes from "./NotFoundImage.module.css";

export function NotFoundImage() {
  const theme = useMantineTheme();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div style={{ color: theme.colors.green[9] }}>
          <Title className={classes.title}>Cari apa bro...</Title>
          <Text size="lg" color={theme.colors.green[9]}>
            Mau cari apa bro?anime?manga?game?mungkin bisa cari di website lain
            awokwokwokwokowkowko
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => window.location.replace("/")}
            color={theme.colors.green[9]}
          >
            Kembali ke halaman utama
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
