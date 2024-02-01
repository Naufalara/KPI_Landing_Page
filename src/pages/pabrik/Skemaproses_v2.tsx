import { Container, Text, Title, useMantineTheme } from "@mantine/core";

export default function Skemaproses() {
  const theme = useMantineTheme();
  return (
    <div>
      <Container pt="xl" c={theme.colors.green[9]}>
        <Title ta="center" pb="xl">
          Skema Proses Produksi
        </Title>
        <Text>
          Langkah awal proses pembuatan amoniak adalah persiapan dengan membuang
          kandungan sulfur di dalam gas alam karena sulfur merupakan racun bagi
          katalis di unit primary reformer. Untuk mendapatkan kandungan
          hidrogen, gas alam dilakukan pemecahan rantai karbon di unit primary
          reformer dan secondary reformer. Nitrogen yang didapat dari udara
          bebas disertakan dalam aliran gas mulai dari unit secondary reformer.
          Nitrogen tidak akan bereaksi hingga sampai pada reaktor amoniak. Gas
          alam yang masih mengandung unsur karbon monoksida (CO) dan karbon
          dioksida (C02) yang akan merusak katalis dalam reaktor amoniak,
          dilewatkan ke unit removal untuk dilakukan proses pemurnian. Sebelum
          masuk ke unit utama pembuatan amoniak yaitu reaktor aminiak, maka
          karbon monoksida dan karbon dioksida yang masih tersisa direaksikan
          kembali ke dalam unit methanator, supaya gas yang akan masuk ke dalam
          reaktor amoniak benar-benar murni dan menghasilkan amoniak dengan
          tingkat efisien yang tinggi. Dengan komposisi hidrogen dan nitrogen
          sebanyak 3:1, maka terjadilah amoniak (NH3) pada reaktor amoniak.
          Selanjutnya melalui proses amoniak sintesis dan refrigerasi, akan
          didapat produk berupa amoniak dalam bentuk cair. Amoniak cair yang
          dihasilkan disimpan dalam sebuah tangki penyimpanan khusus pada suhu
          -33°C.
        </Text>
      </Container>
    </div>
  );
}
