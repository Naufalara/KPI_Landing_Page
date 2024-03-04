import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  Input,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Input.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { HeaderMenu } from "./component/Header/HeaderMenu";
import { FooterLinks } from "./component/Footer/FooterLinks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import News1 from "./pages/news/News1";
import { NotFoundImage } from "./pages/notfound/NotFoundImage";
import History from "./pages/history/History";
import Affixbottom from "./component/Affix/Affixbottom";
import Perusahaan from "./pages/perusahaan/Perusahaan";
import "@mantine/charts/styles.css";
import Pabrik from "./pages/pabrik/Pabrik";
import Login from "./pages/admin/login/login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Newsadmin from "./pages/admin/news/Newsadmin";
import classes from "./App.module.css";
import "@mantine/tiptap/styles.css";
import { Notifications } from "@mantine/notifications";
import AdminLayout from "./component/Layout/AdminLayout";
import Edit from "./pages/admin/news/Edit";
import Search from "./pages/admin/news/Search";
import Account from "./pages/admin/Account/Account";
import AccountEdit from "./pages/admin/Account/AccountEdit";
import Role from "./pages/admin/Account/Role";
import RoleEdit from "./pages/admin/Account/RoleEdit";
import AccountSearch from "./pages/admin/Account/Account-search";

const myColor: MantineColorsTuple = [
  "#e5feee",
  "#d2f9e0",
  "#a8f1c0",
  "#7aea9f",
  "#53e383",
  "#3bdf70",
  "#2bdd66",
  "#1ac455",
  "#0caf49",
  "#00963c",
];

const myColor2: MantineColorsTuple = [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#575757",
];

const theme = createTheme({
  colors: {
    green: myColor,
    gray: myColor2,
  },
  fontFamily: "Montserrat",
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
});

function App() {
  return (
    <Router>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderMenu />
                <Home />
                <FooterLinks />
                <Affixbottom />
              </>
            }
          />
          <Route
            path="/history"
            element={
              <>
                <HeaderMenu />
                <History />
                <FooterLinks />
                <Affixbottom />
              </>
            }
          />

          <Route
            path="/news/:id"
            element={
              <>
                <HeaderMenu />
                <News1 />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/perusahaan"
            element={
              <>
                <HeaderMenu />
                <Perusahaan />
                <FooterLinks />
                <Affixbottom />
              </>
            }
          />
          <Route
            path="/pabrik"
            element={
              <>
                <HeaderMenu />
                <Pabrik />
                <FooterLinks />
                <Affixbottom />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <HeaderMenu />
                <Login />
                <Notifications />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/news-admin"
            element={
              <AdminLayout>
                <Newsadmin />
              </AdminLayout>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminLayout>
                <Edit />
              </AdminLayout>
            }
          />
          <Route
            path="/search/:searchdata"
            element={
              <AdminLayout>
                <Search />
              </AdminLayout>
            }
          />
          <Route
            path="/account"
            element={
              <AdminLayout>
                <Account />
              </AdminLayout>
            }
          />
          <Route
            path="/account/search/:searchdata"
            element={
              <AdminLayout>
                <AccountSearch />
              </AdminLayout>
            }
          />
          <Route
            path="/edit-account/:id"
            element={
              <AdminLayout>
                <AccountEdit />
              </AdminLayout>
            }
          />
          <Route
            path="/role-permission"
            element={
              <AdminLayout>
                <Role />
              </AdminLayout>
            }
          />
          <Route
            path="/role-edit/:id"
            element={
              <AdminLayout>
                <RoleEdit />
              </AdminLayout>
            }
          />
          <Route path="*" element={<NotFoundImage />} />
        </Routes>
      </MantineProvider>
    </Router>
  );
}

export default App;
