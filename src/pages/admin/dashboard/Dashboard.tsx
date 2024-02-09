import {
  Title,
  Text,
  Flex,
  Container,
  Center,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  const theme = useMantineTheme();
  return (
    <div>
      <Container pl={300}>
        <Center className={classes.text} c={theme.colors.green[9]}>
          <Title>Selamat datang di halaman dashboard</Title>
          <Text></Text>
        </Center>
      </Container>
    </div>
  );
}
