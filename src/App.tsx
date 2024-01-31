import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
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
});

function App() {
  return (
    <>
      <Router>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <HeaderMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/docs" element={<div>Docs</div>} />
            <Route
              path="/safety_induction"
              element={<div>Safety Induction</div>}
            />
            <Route path="/community" element={<div>Community</div>} />
            <Route path="/csr" element={<div>CSR</div>} />
            <Route path="/akkpi" element={<div>AKKPI</div>} />
            <Route path="/giska" element={<div>Giska</div>} />
            <Route path="/history" element={<div>History</div>} />
            <Route path="/news/1" element={<News1 />} />
            <Route path="/news/2" element={<News2 />} />
            <Route path="*" element={<NotFoundImage />} />
            <Route path="/perusahaan" element={<Perusahaan />} />
            <Route path="/pabrik" element={<Pabrik />} />
          </Routes>
          <Affixbottom />
          <FooterLinks />
        </MantineProvider>
      </Router>
    </>
  );
}

export default App;
