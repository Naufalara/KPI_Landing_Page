import { Container, Title, useMantineTheme, Text } from "@mantine/core";

export default function Wanakhatulistiwa() {
  const theme = useMantineTheme();
  return (
    <div style={{ backgroundColor: theme.colors.green[9] }}>
      <Container
        size="xl"
        c="white"
        pt="xl"
        pb="xl"
        style={{ textAlign: "justify" }}
      >
        <Title ta="center">Wana Khatulistiwa</Title>
        <Text pt="xl">
          Wana Khatulistiwa, Dengan lahan seluas 8 ha diresmikan dan dikelola
          KPI sejak tahun 2012 dan hingga akhir tahun 2016 telah ditanami kurang
          lebih 3.500 pohon berbagai tanaman khususnya tanaman lokal Kalimantan:
          Bangkirai, Ulin, Gaharu, Pulai, Meranti, Mahoni, juga berbagai tanaman
          buah lokal seperti Manggis, Lai, Rambutan, Durian, Wanyi, Pasak Bumi.
        </Text>
        <Text pt="sm">
          Saat ini dilakukan perawatan tanaman berupai menyiangi rumput,
          memupuk, menyiram pada saat musim kering. Untuk infrastruktur sendiri
          telah tersedia sumur air dan termasuk tandon penyimpanan air bersih
          untuk disalurkan ke kamar mandi maupun penyiraman tanaman di musim
          kemarau.
        </Text>
        <Text pt="sm">
          Selain itu juga telah dibangun Gazebo seluas 6 x 4 meter, dengan
          memanfaatkan kayu ulin bekas dari pabrik dan dikerjakan secara swadaya
          oleh petugas jaga Hutan Kota. Diharapkan dengan adanya Gazebo dan
          kelengkapan koleksi tanaman ini akan menambah infrastruktur yang ada
          sehingga layak dikembangkan menjadi tempat belajar ekstrakulikuler
          siswa tentang tanaman asli Kalimantan. Direncanakan tahun 2017,
          koleksi tanaman akan ditambah lagi 1000 pohon dengan fokus penambahan
          tanaman rawa dan tanaman herbal.
        </Text>
      </Container>
    </div>
  );
}
