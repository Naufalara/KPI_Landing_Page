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
  Select,
  Switch,
  rem,
  Group,
  SimpleGrid,
  Pagination,
  Center,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import classes from "./newsadmin.module.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEffect, useRef, useState } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import api from "../../../api";
import { redirect, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

interface NewsItem {
  id: number;
  judul: string;
  foto: File | null;
  tanggal: string;
  deskripsi: string;
  visibilitas: string;
  kategori: string;
  uploader: string;
}

// useEffect(() => {});

interface deskripsiValues {
  judul: string;
  foto: File | null;
  deskripsi: string;
  idkategori: string;
  tanggal: string;
  visibilitas: string;
  iduploader: string;
}

const [FormProvider, useFormContext, useForm] =
  createFormContext<deskripsiValues>();

function FormField() {
  const theme = useMantineTheme();
  const form = useFormContext();
  const [checked, setChecked] = useState(false);
  const openRef = useRef<() => void>(null);

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  const [kategori, setkategori] = useState();
  const [uploader, setuploader] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const respkategori = await api.get(`/getkategori`);
        const respuploader = await api.get(`/getuploader`);

        //response
        const datakategori = respkategori.data;
        const datauploader = respuploader.data;

        setkategori(datakategori);
        setuploader(datauploader);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate(props) {
      const content = props.editor.getHTML();
      form.setFieldValue("deskripsi", content);
    },
    content: form.values.deskripsi,
  });

  const handleOnDrop = (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFiles([file]);
      // const imageUrl = URL.createObjectURL(file);
      form.setFieldValue("foto", file);
    } else {
      form.setFieldValue("foto", null);
    }
  };

  const handleOnchangeVisibilitas = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
    form.setFieldValue(
      "visibilitas",
      event.target.checked ? "public" : "private"
    );
  };
  return (
    <Container size="default">
      <TextInput
        label="Judul"
        placeholder="Masukkan Judul"
        radius="xl"
        {...form.getInputProps("judul")}
      />
      <Text pt="md">Upload Image</Text>

      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleOnDrop}
          className={classes.dropzone}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload image</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only
              <i>.jpg,. jpeg, .png</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
          color={theme.colors.green[9]}
        >
          Select files
        </Button>
      </div>
      {form.errors.image && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>
          <Text style={{ fontSize: 12 }}>{form.errors.image}</Text>
        </div>
      )}

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
      <Text size="sm" fw={500} pt="md">
        Deskripsi
      </Text>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content {...form.getInputProps("deskripsi")} />
      </RichTextEditor>
      {form.errors.deskripsi && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>
          <Text style={{ fontSize: 12 }}>{form.errors.deskripsi}</Text>
        </div>
      )}
      <Select
        label="Kategori"
        placeholder="Pilih Kategori"
        data={kategori}
        pt="md"
        radius="xl"
        {...form.getInputProps("idkategori")}
      />

      <DateInput
        radius="xl"
        pt="md"
        label="Tanggal"
        valueFormat="DD/MM/YYYY"
        placeholder="Pilih Tanggal"
        {...form.getInputProps("tanggal")}
      />
      <Text fw={500} size="sm" pt="md">
        Visibilitas
      </Text>
      <Switch
        checked={checked}
        onChange={handleOnchangeVisibilitas}
        color="teal"
        size="md"
        thumbIcon={
          checked ? (
            <IconCheck
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.teal[6]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
      <Select
        label="Uploader"
        placeholder="Pilih Uploader"
        data={uploader}
        pt="md"
        radius="xl"
        {...form.getInputProps("iduploader")}
      />
    </Container>
  );
}

export default function Newsadmin() {
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const [filteredData, setFilteredData] = useState("");

  // console.log("filteredData:", filteredData);

  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const [terbuka, { open, close }] = useDisclosure(false);

  const Navigate = useNavigate();

  const [index, setIndex] = useState<NewsItem[]>([]);

  useEffect(() => {
    api
      .get("/news-admin")
      .then((response) => {
        // console.log("Response from API:", response.data); // Tampilkan hasil API ke konsol
        setIndex(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Tangkap dan tampilkan kesalahan ke konsol
      });
  }, []);
  const handleSearch = () => {
    api
      .get("/search/" + filteredData)
      .then((response) => {
        console.log("Response from API:", response.data);
        Navigate("/search/" + filteredData);
      })
      .catch((error) => {
        console.error("Error searching data:", error);
      });
  };

  const newsdata = index;

  const chunkdata = chunk(newsdata, 5);

  // Function to handle changing the active page
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleEdit = (id: number) => {
    api
      .get("/edit/" + id)
      .then(() => {
        Navigate("/edit/" + id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        notifications.show({
          title: "Berita tidak bisa diubah",
          message: `Berita dengan id ${id} tidak bisa diubah`,
          color: "red",
        });
      });
  };

  const [idselected, setidselected] = useState(0);

  const handleDelete = () => {
    api
      .post("/delete/" + idselected)
      .then(() => {
        notifications.show({
          title: "Berita berhasil dihapus",
          message: `Berita dengan id ${idselected} berhasil dihapus`,
          color: "green",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error delete data:", error);
        notifications.show({
          title: "Gagal",
          message: `Gagal menghapus berita`,
          color: "red",
        });
        setTimeout(() => {
          redirect("/news-admin");
        }, 2000);
      });
  };

  const handleopen = (id: number) => {
    open();
    setidselected(id);
  };
  const handleChangeVisibilitas = (id: number) => {
    api
      .post("/changeVisibilitas/" + id)
      .then(() => {
        notifications.show({
          title: "Visibilitas berhasil diubah",
          message: `Berita dengan id ${id} berhasil diubah visibilitasnya`,
          color: "green",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        notifications.show({
          title: "Error",
          message: `Gagal mengubah visibilitas: ${error.message}`,
          color: "red",
        });
      });
  };

  const rows = chunkdata[activePage - 1]?.map((row) => (
    <Table.Tr key={row.id} fw={500}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.judul}</Table.Td>
      <Table.Td>
        <Image src={row.foto} w={200} h="auto" />
      </Table.Td>
      <Table.Td>{row.tanggal}</Table.Td>
      <Table.Td>
        <Text lineClamp={1} fw={500}>
          {row.deskripsi}
        </Text>
      </Table.Td>
      <Table.Td>
        <Button
          mr="md"
          color={row.visibilitas === "public" ? "green" : "red"}
          radius={100}
          onClick={() => handleChangeVisibilitas(row.id)}
        >
          {row.visibilitas === "public" ? "public" : "private"}
        </Button>
      </Table.Td>
      <Table.Td>{row.kategori}</Table.Td>
      <Table.Td>{row.uploader}</Table.Td>
      <Table.Td>
        <Stack>
          <Button color="yellow" onClick={() => handleEdit(row.id)} radius="xl">
            Edit
          </Button>
          <Button color="red" onClick={() => handleopen(row.id)} radius="xl">
            Delete
          </Button>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));
  const addnews = useForm({
    initialValues: {
      judul: "",
      foto: null,
      deskripsi: "",
      idkategori: "",
      tanggal: "",
      visibilitas: "Private",
      iduploader: "",
    },
    // Validasi formulir
    validate: {
      judul: (value) => {
        if (value.length === 0) {
          return "Judul is required";
        }
        return null;
      },
      foto: (value) => {
        if (value === null) {
          return "Image is required";
        }
        return null;
      },
      deskripsi: (value) => {
        const strippedValue = value.replace(/<[^>]+>/g, "");

        // Memeriksa apakah nilai tidak kosong dan tidak hanya berisi spasi
        if (strippedValue.trim().length === 0) {
          return "Deskripsi is required";
        }
        return null;
      },
      idkategori: (value) => {
        if (value.length === 0) {
          return "Kategori is required";
        }
        return null;
      },
      tanggal: (value) => {
        if (value.length === 0) {
          return "Tanggal is required";
        }
        return null;
      },
      iduploader: (value) => {
        if (value.length === 0) {
          return "Uploader is required";
        }
        return null;
      },
    },
  });

  const handleAddNews = () => {
    if (addnews) {
      // Mengubah format tanggal menjadi "yyyy/mm/dd"
      const dateObject = new Date(addnews.values.tanggal);
      const formattedDate = `${dateObject.getFullYear()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getDate()}`;

      const uploaddata = {
        judul: addnews.values.judul,
        foto: addnews.values.foto,
        deskripsi: addnews.values.deskripsi,
        idkategori: addnews.values.idkategori,
        tanggal: formattedDate, // Menggunakan format tanggal yang diubah
        visibilitas: addnews.values.visibilitas,
        iduploader: addnews.values.iduploader,
      };

      console.log("news values:", uploaddata);

      api
        .post("/upload", uploaddata)
        .then((response) => {
          console.log(response);

          notifications.show({
            title: "Berita berhasil dikirim",
            message: `Berita "${uploaddata.judul}" berhasil dikirim`,
            color: "green",
          });

          // Refresh the page
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          notifications.show({
            title: "Gagal",
            message: `Gagal mengirim berita`,
            color: "red",
          });
        });
    }
  };
  return (
    <div className={classes.body}>
      <Container size="default" pt="md">
        <Title c={theme.colors.green[9]}>News Dashboard</Title>
        <Tabs defaultValue="index" color={theme.colors.green[9]}>
          <Tabs.List c={theme.colors.green[9]} justify="flex-start">
            <Tabs.Tab value="index" fw={700}>
              Index
            </Tabs.Tab>
            <Tabs.Tab value="add" fw={700}>
              Add News
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="index">
            <TextInput
              radius="xl"
              size="md"
              p="md"
              placeholder="Search..."
              rightSectionWidth={42}
              color={theme.colors.green[9]}
              c={theme.colors.green[9]}
              onChange={(event) =>
                setFilteredData(event.currentTarget.value.toString())
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              leftSection={
                <IconSearch
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.colors.green[9]}
                  variant="filled"
                  onClick={() => handleSearch()}
                >
                  <IconArrowRight
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
            />
            <Center>
              <Table.ScrollContainer minWidth="50vw" w="90vw" h="65vh">
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
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Center>
            <Center>
              <Pagination
                total={chunkdata.length}
                value={activePage}
                onChange={handlePageChange}
                mt="sm"
                color={theme.colors.green[9]}
              />
            </Center>
          </Tabs.Panel>

          <Tabs.Panel value="add" p="md" c={theme.colors.green[9]}>
            <FormProvider form={addnews}>
              <form onSubmit={addnews.onSubmit(handleAddNews)}>
                <FormField />
                <Container fluid>
                  <Button
                    color={theme.colors.green[9]}
                    radius="xl"
                    mt="md"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Container>
              </form>
            </FormProvider>
          </Tabs.Panel>
        </Tabs>
      </Container>
      <Modal
        opened={terbuka}
        onClose={close}
        title="Are you sure want to delete?"
      >
        <Button onClick={close} color={theme.colors.green[9]}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="red" ml="md">
          Delete
        </Button>
      </Modal>
    </div>
  );
}
