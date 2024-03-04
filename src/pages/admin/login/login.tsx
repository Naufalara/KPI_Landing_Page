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
} from "@mantine/core";
import classes from "./login.module.css";
import { useForm } from "@mantine/form";
import api from "../../../api";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../Context";

export default function login() {
  const theme = useMantineTheme();
  const { setUser, csrfToken } = useAuth();

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
        return null;
      },
    },
  });

  // const Nvg = useNavigate();
  const handleLogin = async () => {
    if (login) {
      await csrfToken();
      api
        .post("/login", {
          email: login.values.email,
          password: login.values.password,
        })
        .then((response) => {
          // navigate("/admin");
          // <Nvg to="/admin" />;
          // window.location.href = "/admin";
          console.log("Login successful:", response);
          setUser(response.data.user);
          notifications.show({
            title: "Login success",
            message: "Welcome to KPI Admin Page",
            color: "green",
          });
          // <Navigate to="/admin" />;
          // Nvg("/admin");
          window.location.href = "/admin";
        })
        .catch((error) => {
          console.error("Login failed:", error);
          notifications.show({
            title: "Login failed",
            message: "Invalid email or password",
            color: "red",
          });
        });
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
                      withAsterisk
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
