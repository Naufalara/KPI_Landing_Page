import { Container, Table } from "@mantine/core";
import React from "react";

const data = [
  {
    no: 1,
    image: "",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 2,
    image: "",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 3,
    image: "",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
  {
    no: 4,
    image: "",
    title: "KPI Raih Penghargaan",
    date: "2021-10-10",
    desc: "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
    kategori: "Berita",
    uploader: "Nopal",
  },
];
export default function Newsadmin() {
  const rows = data.map((row) => (
    <Table.Tr>
      <Table.Td>{row.no}</Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.desc}</Table.Td>
      <Table.Td>{row.kategori}</Table.Td>
      <Table.Td>{row.uploader}</Table.Td>
      <Table.Td>Action</Table.Td>
    </Table.Tr>
  ));
  return (
    <div>
      <Container pl={300}>
        <Table>
          <Table.Thead>
            <Table.Tr>Nomor</Table.Tr>
            <Table.Tr>Judul</Table.Tr>
            <Table.Tr>Tanggal</Table.Tr>
            <Table.Tr>Deskripsi</Table.Tr>
            <Table.Tr>Kategori</Table.Tr>
            <Table.Tr>Uploader</Table.Tr>
            <Table.Tr>Action</Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </div>
  );
}
