import {
  Container,
  useMantineTheme,
  Button,
  Image,
  Text,
  TextInput,
  Select,
  Switch,
  rem,
  Group,
  SimpleGrid,
  Stack,
} from "@mantine/core";
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
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconX,
} from "@tabler/icons-react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { DateInput } from "@mantine/dates";

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

  const { id } = useParams();

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const [filesbe, setFilesbe] = useState<FileWithPath[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get(`/edit/${id}`);
        const data = response.data.imagebefore;
        setFilesbe(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        height="auto"
        width="auto"
      />
    );
  });

  const editor = useEditor({
    content: form.values.deskripsi,
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
  });

  useEffect(() => {
    if (form.values.deskripsi) {
      editor?.commands.setContent(form.values.deskripsi, false);
    }
  }, [form.values.deskripsi]);

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
              <Dropzone.Reject>Image file less than 30mb</Dropzone.Reject>
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
      {form.errors.foto && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>
          <Text style={{ fontSize: 12 }}>{form.errors.foto}</Text>
        </div>
      )}
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        <Stack>
          <Text>Before</Text>
          <Image src={filesbe} height="auto" width="auto" />
        </Stack>
        <Stack>
          <Text>After</Text>

          {previews}
        </Stack>
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
        label="Tanggal"
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

export default function Edit() {
  const theme = useMantineTheme();

  const Navigate = useNavigate();

  const { id } = useParams();

  const editNews = useForm({
    initialValues: {
      judul: "",
      foto: null,
      deskripsi: "",
      idkategori: "",
      tanggal: "",
      visibilitas: "private",
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
      iduploader: (value) => {
        if (value.length === 0) {
          return "Uploader is required";
        }
        return null;
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/edit/${id}`);
        const data = response.data.data;
        const fixingdata = {
          judul: data.judul,
          foto: data.foto,
          deskripsi: data.deskripsi,
          idkategori: data.idkategori,
          tanggal: "",
          visibilitas: data.visibilitas,
          iduploader: data.iduploader,
        };

        // console.log("fixingdata:", fixingdata);
        editNews.setInitialValues(fixingdata);
        editNews.setValues(fixingdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // console.log(editNews.values);
  const redirect = useNavigate();

  const handleeditNews = () => {
    if (editNews) {
      const dateObject = new Date(editNews.values.tanggal);
      const formattedDate = `${dateObject.getFullYear()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getDate()}`;

      if (formattedDate === "NaN/NaN/NaN") {
        const uploaddata = {
          id: id,
          judul: editNews.values.judul,
          foto: editNews.values.foto,
          deskripsi: editNews.values.deskripsi,
          idkategori: editNews.values.idkategori,
          // tanggal: "", // Menggunakan format tanggal yang diubah
          visibilitas: editNews.values.visibilitas,
          iduploader: editNews.values.iduploader,
        };
        // console.log(editNews.values);

        api
          .post("/update/" + id, uploaddata)
          .then(() => {
            // console.log("response: ", response);
            // console.log("upload data", uploaddata);

            notifications.show({
              title: "Berita berhasil dikirim",
              message: `Berita "${uploaddata.judul}" berhasil dikirim`,
              color: "green",
            });

            // Refresh the page
            setTimeout(() => {
              redirect("/news-admin");
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
      } else {
        const uploaddata = {
          id: id,
          judul: editNews.values.judul,
          foto: editNews.values.foto,
          deskripsi: editNews.values.deskripsi,
          idkategori: editNews.values.idkategori,
          tanggal: formattedDate, // Menggunakan format tanggal yang diubah
          visibilitas: editNews.values.visibilitas,
          iduploader: editNews.values.iduploader,
        };
        // console.log(editNews.values);

        api
          .post("/update/" + id, uploaddata)
          .then(() => {
            // console.log("response: ", response);
            // console.log("upload data", uploaddata);

            notifications.show({
              title: "Berita berhasil dikirim",
              message: `Berita "${uploaddata.judul}" berhasil dikirim`,
              color: "green",
            });

            // Refresh the page
            setTimeout(() => {
              redirect("/news-admin");
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
    }
  };

  return (
    <FormProvider form={editNews}>
      <form onSubmit={editNews.onSubmit(handleeditNews)}>
        <Container fluid c={theme.colors.green[9]}>
          <FormField />
          <Button
            color={theme.colors.green[9]}
            radius="xl"
            mt="md"
            type="submit"
          >
            Submit
          </Button>
          <Button
            color="red"
            radius="xl"
            mt="md"
            ml="md"
            onClick={() => Navigate("/news-admin")}
          >
            Back
          </Button>
        </Container>
      </form>
    </FormProvider>
  );
}
