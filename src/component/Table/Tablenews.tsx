import {
  Pagination,
  Table,
  useSafeMantineTheme,
  Image,
  Text,
  Button,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../../api";
import { notifications } from "@mantine/notifications";

const [index, setIndex] = useState([]);

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

useEffect(() => {
  api
    .get("news-admin")
    .then((response) => {
      setIndex(response.data);
    })
    .catch((error) => {
      console.error("Data failed to load", error);
      notifications.show({
        title: "Data failed to load",
        message: "failed to load",
        color: "red",
      });
    });
}, []); // <-- Memberikan array kosong sebagai dependensi untuk useEffect agar hanya dipanggil sekali saat komponen dimuat

const chunkData = chunk(index, 5);

export default function Tablenews() {
  const [activePage, setPage] = useState(1);
  const rows = chunkData[activePage - 1].map((row) => (
    <Table.Tr key={row["id"]}>
      <Table.Td>{row["id"]}</Table.Td>
      <Table.Td>{row["judul"]}</Table.Td>
      <Table.Td>
        <Image src={row["foto"]} w={200} />
      </Table.Td>
      <Table.Td>{row["tanggal"]}</Table.Td>
      <Table.Td>
        <Text lineClamp={1}>{row["deskripsi"]}</Text>
      </Table.Td>
      <Table.Td>
        <Button
          mr="md"
          color={row["visibilitas"] === "public" ? "green" : "red"}
          radius={100}
        >
          {row["visibilitas"] === "public" ? "Public" : "Private"}
        </Button>
      </Table.Td>
      <Table.Td>{row["idkategori"]}</Table.Td>
      <Table.Td>{row["uploader"]}</Table.Td>
      <Table.Td>
        <Stack>
          <Button color="yellow">Edit</Button>
          <Button color="red">Delete</Button>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));
  const theme = useSafeMantineTheme();
  return (
    <>
      <Table.ScrollContainer minWidth="50vw" w="70vw" h="60vh">
        <Table stickyHeader highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr c={theme.colors.green[9]}>
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
      </Table.ScrollContainer>
      <Pagination
        total={chunkData.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
        color={theme.colors.green[9]}
      />
    </>
  );
}
