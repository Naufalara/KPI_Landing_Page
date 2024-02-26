import { Title, Container, Center, useMantineTheme } from "@mantine/core";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  const theme = useMantineTheme();

  return (
    <Container>
      <Center className={classes.text} c={theme.colors.green[9]}>
        <Title>Selamat datang di halaman dashboard</Title>
      </Center>
    </Container>
  );
}
