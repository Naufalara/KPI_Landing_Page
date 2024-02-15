import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Flex,
  Text,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
  em,
} from "@mantine/core";
import classes from "./login.module.css";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mantine/hooks";

export default function login() {
  const theme = useMantineTheme();

  const login = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (value.length === 0) {
          return "Email is required";
        }
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email";
      },
      password: (value) => {
        if (value.length === 0) {
          return "Password is required";
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character";
      },
    },
  });

  const Navigate = useNavigate();

  const handleLogin = () => {
    if (login) {
      Navigate("/admin");
    }
  };
  return (
    <>
      <div className={classes.bgimage}>
        <div className={classes.containerOverlay}>
          <Container size="xl" pt="xl">
            <Paper radius="xl" shadow="xl">
              <form onSubmit={login.onSubmit(handleLogin)}>
                <Flex>
                  <div>
                    <Image
                      src="https://kpi.co.id/public/upload/image/thumbs/img-3231a-1701762443.jpg"
                      fit="cover"
                      w={700}
                      height={700}
                      visibleFrom="sm"
                    />
                  </div>

                  <Stack
                    justify="center"
                    p="md"
                    w={400}
                    c={theme.colors.green[9]}
                  >
                    <Title>PT. Kaltim Parna Industri</Title>

                    <TextInput
                      label="Email"
                      placeholder="insert your email"
                      {...login.getInputProps("email")}
                      // required
                    />
                    <PasswordInput
                      label="Password"
                      withAsterisk
                      placeholder="insert your password"
                      {...login.getInputProps("password")}
                      // required
                    />
                    <Group>
                      <Checkbox color={theme.colors.green[9]}></Checkbox>
                      <Text c="dimmed" size="sm">
                        Remember me
                      </Text>
                    </Group>
                    <Button color={theme.colors.green[9]} type="submit">
                      Login
                    </Button>
                    <Anchor ta="center" c={theme.colors.green[9]}>
                      Forgot Password
                    </Anchor>
                  </Stack>
                </Flex>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}
