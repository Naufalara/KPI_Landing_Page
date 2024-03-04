import {
  Title,
  useMantineTheme,
  AppShell,
  Group,
  Burger,
  Image,
  ActionIcon,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import kpiLogo from "../../../public/kpi_logo.png";
import { Navbar } from "../../component/Navbar/Navbar";
import { IconLogout } from "@tabler/icons-react";
import api from "../../api";
import { useNavigate, Navigate as Nvg } from "react-router-dom";
import { useAuth } from "../../Context";
import { ReactNode, useEffect } from "react";
import { Notifications } from "@mantine/notifications";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [terbuka, { open, close }] = useDisclosure(false);
  const Navigate = useNavigate();
  const { user, setUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    api
      .get("/user")
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Redirect to the login page
          Navigate("/login");
        }
      });
  }, []);

  const handleLogout = async () => {
    if (user) {
      await api.post("/logout");
      localStorage.removeItem("user");
      Navigate("/login");
    }
    return <Nvg to="/login" />;
  };
  // if (!user) {
  //   return;
  // }
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Image src={kpiLogo} w="xl" visibleFrom="sm" />
              <Title c={theme.colors.green[9]} order={4}>
                PT KALTIM PARNA INDUSTRI
              </Title>
            </Group>
            <ActionIcon
              color={theme.colors.green[9]}
              radius="xl"
              size={isMobile ? "md" : "xl"}
              onClick={open}
              // visibleFrom="sm"
            >
              <IconLogout size={isMobile ? 20 : 28} />
            </ActionIcon>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar user={user} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <Modal opened={terbuka} onClose={close} title="Want to logout?">
        <Button onClick={close} color={theme.colors.green[9]} radius="xl">
          Cancel
        </Button>
        <Button
          onClick={handleLogout}
          color={theme.colors.green[9]}
          ml="md"
          radius="xl"
        >
          Logout
        </Button>
      </Modal>
      <Notifications />
    </>
  );
}
