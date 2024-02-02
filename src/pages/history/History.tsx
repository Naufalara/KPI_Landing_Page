import { useState, useRef, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import classes from "./History.module.css";
import {
  Container,
  Timeline,
  Image,
  Text,
  Flex,
  Title,
  Center,
  useMantineTheme,
  Anchor,
} from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

const history = [
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/icon3-1701762307.png",
    date: "17 Juli 1995",
    desc: "PT KPI didirikan dengan Akta Notaris No.97 Tahun 1995 oleh PT. Parna Raya & YKHT",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/pabrikkpi-1623308281.jpg",
    date: "13 Februari 1996",
    desc: "Pemerintah melalui Kementerian Hukum dan HAM mengesahkan Akta Pendirian No. 97 Tahun 1995",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/welcoming-ceremony-1623308334.jpg",
    date: "26 September 1997",
    desc: "Perjanjian Kerja Sama yang ditandatangani oleh PT. Parna Raya, YKHT & Mitsubishi Corp",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/mitsubishi2-1637553089.jpg",
    date: "19 Februari 1998",
    desc: "Menandatangani perjanjian Kontraktor EPC dengan MHI",
  },
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/bkpm-1623308444.jpg",
    date: "27 Februari 1998",
    desc: "Pemerintah menyetujui KPI sebagai perusahaan Penanaman Modal Asing dengan surat No.13/V/PMA/1998",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/pertamina-2-1637551582.jpg",
    date: "14 Juli 1999",
    desc: "Kontrak jual beli gas alam ditandatangani dengan PERTAMINA",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/contruction-commence-1623308521.jpg",
    date: "17 Februari 2000",
    desc: "Dimulainya konstruksi Pabrik PT Kaltim Parna Industri",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/ammonia-first-drop-1623309387.jpg",
    date: "12 November 2001",
    desc: "Ammonia First Drop dimulai pukul 14:00 WITA",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/danapensiun-2-1623309436.png",
    date: "26 November 2001",
    desc: "Dana Pensiun Pupuk Kalimantan Timur bergabung sebagai Pemegang Saham",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/comm-prod-1623309468.jpg",
    date: "01 Desember 2001",
    desc: "Produksi Amoniak secara komersial dimulai",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/peresmian-pabrik-1623309498.JPG",
    date: "03 Juli 2002",
    desc: "Pabrik KPI diresmikan oleh Menteri Pertanian atas Nama Presiden RI (Ibu Megawati Soekarnoputri)",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/logo-iso9001-bv-1637717290.png",
    date: "06 Februari 2008",
    desc: "Dimulainya implementasi Sistem Manajemen Terpadu ISO9001, ISO14001, OHSAS 18001",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/rci-img-1637717535.jpg",
    date: "26 Juni 2008",
    desc: "Terdaftar sebagai anggota Komite Nasional Responsible Care Indonesia – KNRCI (Organisasi yang berfokus pada perbaikan berkesinambungan keselamatan, kesehatan dan kinerja lingkungan)",
  },
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/smk3-1623309949.jpg",
    date: "12 September 2008",
    desc: "Dimulainya implementasi Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)",
  },
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/kan3-1633659950.jpg",
    date: "12 Juni 2009",
    desc: "Dimulainya implementasi ISO 17025 untuk Laboratorium KPI",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/rapatumumsaham-1623310075.jpg",
    date: "30 April 2013",
    desc: "Rapat Umum Pemegang Saham Luar Biasa untuk Jual dan Transfer saham dari Mitsubishi, Asahi, NYK ke PT. Parna Raya",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/sahamparnaraya-1623310279.jpg",
    date: "27 Mei 2013",
    desc: "Penandatanganan Jual dan Transfer Saham dari Mitsubishi, Asahi, NYK ke PT. Parna Raya",
  },
  {
    image: "https://kpi.co.id/public/upload/image/thumbs/pipa-1623310468.jpg",
    date: "31 Desember 2015",
    desc: "Pengiriman Amoniak melalui pipa secara komersial ke PT Kaltim Nitrate Indonesia",
  },
  {
    image:
      "https://kpi.co.id/public/upload/image/thumbs/logo-kpi-fix-1633658890.png",
    date: "15 Mei 2017",
    desc: "Pada tanggal 15 Mei 2017 & 16 Mei 2017 Yayasan Kesejahteraan Hari Tua Pupuk Kaltim dan Dana Pensiun Pupuk Kalimantan Timur memindahkan 5% kepemilikan saham mereka kepada Bapak Marihad Simbolon",
  },
];
const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
export default function History() {
  const theme = useMantineTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const historyItems = history.map((history) => {
    return (
      <Timeline.Item>
        <motion.div
          className="card-container"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0 }}
          variants={cardVariants}
        >
          <Container size="default">
            <Flex gap="lg" justify="flex-start" align="center">
              <motion.div whileHover={{ scale: 2 }}>
                <Image src={history.image} height={160} w={144} fit="contain" />
              </motion.div>
              <Flex direction="column" c={theme.colors.green[9]}>
                <Text fw={700}>{history.date}</Text>
                <Text c="dimmed">{history.desc}</Text>
              </Flex>
            </Flex>
          </Container>
        </motion.div>
      </Timeline.Item>
    );
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust as needed
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0",
            10
          );
          setActiveIndex(index);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    document.querySelectorAll(".card-container").forEach((card, index) => {
      observerRef.current?.observe(card);
      card.setAttribute("data-index", index.toString());
    });

    return () => observerRef.current?.disconnect();
  }, []); // Run this effect only once on mount

  return (
    <div id="top">
      <Container className={classes.body}>
        <Anchor href="/" c={theme.colors.green[9]}>
          <Center inline>
            <IconArrowNarrowLeft />
            <Text ml="xs">Back to Home</Text>
          </Center>
        </Anchor>
        <Center>
          <Title c={theme.colors.green[9]} pb="xl">
            History
          </Title>
        </Center>
        <Timeline active={activeIndex} color={theme.colors.green[9]}>
          {historyItems}
        </Timeline>
      </Container>
    </div>
  );
}
