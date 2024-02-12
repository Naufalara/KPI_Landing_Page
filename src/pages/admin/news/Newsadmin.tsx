import {
  Container,
  Table,
  Tabs,
  Title,
  useMantineTheme,
  Button,
  Image,
  Text,
  Stack,
  TextInput,
} from "@mantine/core";
import classes from "./newsadmin.module.css";
import { SearchBar } from "../../../component/SearchBar/SearchBar";

const data = [
  {
    no: 1,
    image: "",
    visibilitas: "Public",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 2,
    image: "",
    visibilitas: "Private",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 3,
    image: "",
    visibilitas: "Public",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "aouhfdanfilahfeiuhfiueafheiuhafl asdihf laiejhfiuea wlh",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 4,
    image: "",
    visibilitas: "Private",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia asddadsa asdsdsadsdas asdas",
    kategori: "Berita",
    uploader: "Nopal",
  },
];
export default function Newsadmin() {
  const theme = useMantineTheme();

  const rows = data.map((row) => (
    <Table.Tr>
      <Table.Td>{row.no}</Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>
        <Image src={row.image} w={200} />
      </Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>
        <Text lineClamp={1}>{row.desc}</Text>
      </Table.Td>
      <Table.Td>
        <Button
          mr="md"
          color={row.visibilitas === "Public" ? "green" : "red"}
          radius={100}
        >
          {row.visibilitas === "Public" ? "Public" : "Private"}
        </Button>
      </Table.Td>
      <Table.Td>{row.kategori}</Table.Td>
      <Table.Td>{row.uploader}</Table.Td>
      <Table.Td>
        <Stack>
          <Button color="yellow">Edit</Button>
          <Button color="red">Delete</Button>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.body}>
      <Container pl={300} size="default" pt="md">
        <Title c={theme.colors.green[9]}>News Admin Dashboard</Title>
        <Tabs defaultValue="index" color={theme.colors.green[9]}>
          <Tabs.List>
            <Tabs.Tab value="index">Index</Tabs.Tab>
            <Tabs.Tab value="add">Add News</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="index">
            <SearchBar />
            <Table
              stickyHeader
              highlightOnHover
              className={classes.table}
              verticalSpacing="sm"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nomor</Table.Th>
                  <Table.Th>Judul</Table.Th>
                  <Table.Th>Foto</Table.Th>
                  <Table.Th>Tanggal</Table.Th>
                  <Table.Th>Deskripsi</Table.Th>
                  <Table.Th>Visibilitas</Table.Th>
                  <Table.Th>Kategori</Table.Th>
                  <Table.Th>Uploader</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Tabs.Panel>

          <Tabs.Panel value="add">
            <TextInput label="Judul" placeholder="Masukkan Judul" />
            {/* <ImageInput source="pictures" label="Related pictures">
              <ImageField source="src" title="title" />
            </ImageInput> */}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}
