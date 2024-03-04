import { IconNotes, IconGauge, IconLock } from "@tabler/icons-react";
import { LinksGroup } from "../LinksGroup/NavbarLinksGroup";
import classes from "./Navbar.module.css";
import { Container, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../../api";

export function Navbar(props: { user: any }) {
  const [mockdata, setMockdata] = useState<any[]>([]);
  const user = props.user;

  // console.log("user dari navbar", user);

  useEffect(() => {
    // Fungsi untuk memuat data setelah delay
    const loadDataWithDelay = () => {
      // Tunggu 500ms sebelum memuat data
      setTimeout(() => {
        // Pastikan user.data telah terisi sebelum melanjutkan
        if (user && user.data && user.data.roleid) {
          const roleId = user.data.roleid;
          api
            .get(`/user-login-permission?roleid=${roleId}`)
            .then((response) => {
              const permissions = response.data.map(
                (permission: any) => permission.name
              );
              setMockdata(getMockData(permissions));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 500);
    };

    // Panggil fungsi untuk memuat data setelah delay
    loadDataWithDelay();
  }, [user]);

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <div>
      <Container>
        <nav className={classes.navbar}>
          <ScrollArea className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
        </nav>
      </Container>
    </div>
  );
}

function getMockData(userPermission: string[]): any[] {
  if (
    userPermission.includes("index-user") &&
    userPermission.includes("index-news") &&
    userPermission.includes("role-list")
  ) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },

      {
        label: "News",
        icon: IconNotes,
        links: [{ label: "News Admin", link: "/news-admin" }],
      },
      {
        label: "Settings",
        icon: IconLock,
        links: [
          { label: "Account", link: "/account" },
          { label: "Role & Permission", link: "/role-permission" },
        ],
      },
    ];
  } else if (
    userPermission.includes("index-user") &&
    userPermission.includes("index-news")
  ) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },

      {
        label: "News",
        icon: IconNotes,
        links: [{ label: "News Admin", link: "/news-admin" }],
      },
      {
        label: "Settings",
        icon: IconLock,
        links: [
          { label: "Account", link: "/account" },
          { label: "Role & Permission", link: "/role-permission" },
        ],
      },
    ];
  } else if (
    userPermission.includes("role-list") &&
    userPermission.includes("index-news")
  ) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },

      {
        label: "News",
        icon: IconNotes,
        links: [{ label: "News Admin", link: "/news-admin" }],
      },
      {
        label: "Settings",
        icon: IconLock,
        links: [{ label: "Role & Permission", link: "/role-permission" }],
      },
    ];
  } else if (
    userPermission.includes("index-user") &&
    userPermission.includes("role-list")
  ) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
      {
        label: "Settings",
        icon: IconLock,
        links: [
          { label: "Account", link: "/account" },
          { label: "Role & Permission", link: "/role-permission" },
        ],
      },
    ];
  } else if (userPermission.includes("index-news")) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
      {
        label: "News",
        icon: IconNotes,
        links: [{ label: "News Admin", link: "/news-admin" }],
      },
    ];
  } else if (userPermission.includes("role-list")) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
      {
        label: "Settings",
        icon: IconLock,
        links: [{ label: "Role & Permission", link: "/role-permission" }],
      },
    ];
  } else if (userPermission.includes("index-user")) {
    return [
      { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
      {
        label: "Settings",
        icon: IconLock,
        links: [{ label: "Account", link: "/account" }],
      },
    ];
  } else {
    return [];
  }
}
