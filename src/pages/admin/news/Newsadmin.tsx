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
  AppShell,
  Burger,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import classes from "./newsadmin.module.css";
import { SearchBar } from "../../../component/SearchBar/SearchBar";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useRef, useState } from "react";
import {
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconX,
} from "@tabler/icons-react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Navbar } from "../../../component/Navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const generateData = () => {
  const generatedData = [];
  for (let i = 1; i <= 30; i++) {
    generatedData.push({
      no: i,
      image: "",
      visibilitas: i % 3 === 0 ? "Private" : "Public",
      title: "KPI Raih Penghargaan",
      date: "2021-10-10",
      desc:
        i % 2 === 0
          ? "KPI meraih penghargaan sebagai perusahaan asddadsa asdsdsadsdas asdas"
          : "KPI meraih penghargaan sebagai perusahaan terbaik di Indonesia",
      kategori: "Berita",
      uploader: "Nopal",
    });
  }
  return generatedData;
};

const data = generateData();

const chunkdata = chunk(data, 5);

const category = [
  { value: "Berita", label: "Berita" },
  { value: "Pengumuman", label: "Pengumuman" },
  { value: "Artikel", label: "Artikel" },
];

const users = [
  { value: "Nopal", label: "Nopal" },
  { value: "Hutao", label: "Hutao" },
  { value: "KPI", label: "KPI" },
];

interface deskripsiValues {
  judul: string;
  image: string;
  deskripsi: string;
  kategori: string;
  tanggal: string;
  visibilitas: string;
  uploader: string;
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
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    form.setFieldValue("image", imageUrl);
  };

  const handleOnchangeVisibilitas = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
    form.setFieldValue(
      "visibilitas",
      event.target.checked ? "Public" : "Private"
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
        data={category}
        pt="md"
        radius="xl"
        {...form.getInputProps("kategori")}
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
        data={users}
        pt="md"
        radius="xl"
        {...form.getInputProps("uploader")}
      />
    </Container>
  );
}

export default function Newsadmin() {
  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);

  const [opened, { toggle }] = useDisclosure();

  const rows = chunkdata[activePage - 1].map((row) => (
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

  const addnews = useForm({
    initialValues: {
      judul: "",
      image: "",
      deskripsi: "",
      kategori: "",
      tanggal: "",
      visibilitas: "Private",
      uploader: "",
    },
    // Validasi formulir
    validate: {
      judul: (value) => {
        if (value.length === 0) {
          return "Judul is required";
        }
        return null;
      },
      image: (value) => {
        if (value.length === 0) {
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
      kategori: (value) => {
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
      uploader: (value) => {
        if (value.length === 0) {
          return "Uploader is required";
        }
        return null;
      },
    },
  });
  const handleAddNews = () => {
    if (addnews) {
      console.log(addnews.values);

      notifications.show({
        title: "Berita berhasil dikirim",
        message: `Berita "${addnews.values.judul}" berhasil dikirim`,
        color: "green",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      notifications.show({
        title: "Gagal",
        message: `Gagal mengirim berita`,
        color: "red",
      });
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <Image src={kpiLogo} w={50} /> */}
          <Title c={theme.colors.green[9]} order={4}>
            PT. KALTIM PARNA INDUSTRI
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className={classes.body}>
          <Container size="default" pt="md">
            <Title c={theme.colors.green[9]}>News Admin Dashboard</Title>
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
                <SearchBar />
                <Center>
                  <Table.ScrollContainer minWidth="50vw" w="70vw" h="50vh">
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
                </Center>
                <Center>
                  <Pagination
                    total={chunkdata.length}
                    value={activePage}
                    onChange={setPage}
                    mt="sm"
                    color={theme.colors.green[9]}
                  />
                </Center>
              </Tabs.Panel>

              <Tabs.Panel value="add" p="md" c={theme.colors.green[9]}>
                <FormProvider form={addnews}>
                  <form onClick={addnews.onSubmit(handleAddNews)}>
                    <Container fluid>
                      <FormField />
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
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
