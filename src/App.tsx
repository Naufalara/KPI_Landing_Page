import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  Flex,
  Input,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { HeaderMenu } from "./component/Header/HeaderMenu";
import { FooterLinks } from "./component/Footer/FooterLinks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import News1 from "./pages/news/News1";
import { NotFoundImage } from "./pages/notfound/NotFoundImage";
import History from "./pages/history/History";
import Affixbottom from "./component/Affix/Affixbottom";
import News2 from "./pages/news/News2";
import Perusahaan from "./pages/perusahaan/Perusahaan";
import "@mantine/charts/styles.css";
import Pabrik from "./pages/pabrik/Pabrik";
import Login from "./pages/admin/login/login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { Navbar } from "./component/Navbar/Navbar";
import LandingPageEdit from "./pages/admin/landing-page-edit/landing-page-edit";
import Newsadmin from "./pages/admin/news/Newsadmin";
import classes from "./App.module.css";

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
              </>
            }
          />
          <Route
            path="/docs"
            element={
              <>
                <HeaderMenu />
                <div>Docs</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/safety_induction"
            element={
              <>
                <HeaderMenu />
                <div>Safety Induction</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/community"
            element={
              <>
                <HeaderMenu />
                <div>Safety Induction</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/csr"
            element={
              <>
                <HeaderMenu />
                <div>Safety Induction</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/akkpi"
            element={
              <>
                <HeaderMenu />
                <div>Safety Induction</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/giska"
            element={
              <>
                <HeaderMenu />
                <div>Safety Induction</div>
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/news/1"
            element={
              <>
                <HeaderMenu />
                <News1 />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/news/2"
            element={
              <>
                <HeaderMenu />
                <News2 />
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
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <HeaderMenu />
                <Login />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Flex>
                  <Navbar />
                  <Dashboard />
                </Flex>
              </>
            }
          />
          <Route
            path="/landing-page-edit"
            element={
              <>
                <Flex>
                  <Navbar />
                  <LandingPageEdit />
                </Flex>
              </>
            }
          />
          <Route
            path="/news-admin"
            element={
              <>
                <Flex>
                  <Navbar />
                  <Newsadmin />
                </Flex>
              </>
            }
          />
          <Route path="*" element={<NotFoundImage />} />
        </Routes>
        <Affixbottom />
      </MantineProvider>
    </Router>
  );
}

export default App;
