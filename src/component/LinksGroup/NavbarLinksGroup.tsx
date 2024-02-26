import { useEffect, useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";
import api from "../../api";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  user: any; // Tambahkan prop user
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  user, // Terima prop user
}: LinksGroupProps) {
  // const [userData, setUserData] = useState<any>(); // Menggunakan tipe any untuk sementara

  // console.log("user dari linksgroup", user);

  useEffect(() => {
    // Memuat data pengguna saat komponen dimuat atau prop user berubah
    if (user) {
      const roleId = user.roleid;
      api
        .get(`/user-login-permission?roleid=${roleId}`)
        .then(() => {
          // Memproses data untuk mengambil hanya nilai 'name' dari setiap objek
          // console.log("respon get user permission:", permissions);
        })
        .catch((error) => {
          console.error("Error fetching user permissions:", error);
        });
    }
  }, [user]); // Gunakan user sebagai dependency

  const theme = useMantineTheme();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30} color={theme.colors.green[9]}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup(props: { user: any }) {
  const user = props.user;
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} user={user} /> {/* Teruskan prop user */}
    </Box>
  );
}
