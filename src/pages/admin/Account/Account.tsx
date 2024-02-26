import {
  Container,
  Table,
  Tabs,
  Title,
  useMantineTheme,
  Button,
  Stack,
  TextInput,
  Select,
  rem,
  Pagination,
  Center,
  Modal,
  ActionIcon,
  PasswordInput,
} from "@mantine/core";
import classes from "./account.module.css";
import { useEffect, useState } from "react";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

interface UserItem {
  id: number;
  name: string;
  email: string;
  roleid: number;
  role: string;
}

// useEffect(() => {});

interface userValues {
  name: string;
  email: string;
  password: string;
  roleid: string;
}

const [FormProvider, useFormContext, useForm] = createFormContext<userValues>();

function FormField() {
  const form = useFormContext();
  const [role, setrole] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resprole = await api.get(`/getrole`);

        //response
        const datarole = resprole.data;

        setrole(datarole);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <Container size="default">
      <TextInput
        label="Name"
        placeholder="Masukkan Nama"
        radius="xl"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Email"
        placeholder="Masukkan Email"
        radius="xl"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Masukkan Password"
        radius="xl"
        {...form.getInputProps("password")}
      />
      <Select
        label="Role"
        placeholder="Pilih Role"
        data={role}
        radius="xl"
        {...form.getInputProps("roleid")}
      />
    </Container>
  );
}

export default function Account() {
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const [filteredData, setFilteredData] = useState("");

  //   console.log("filteredData:", filteredData);

  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const [terbuka, { open, close }] = useDisclosure(false);

  const Navigate = useNavigate();

  const [index, setIndex] = useState<UserItem[]>([]);

  useEffect(() => {
    api
      .get("/account-admin")
      .then((response) => {
        console.log("Response from API:", response.data); // Tampilkan hasil API ke konsol
        setIndex(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Tangkap dan tampilkan kesalahan ke konsol
      });
  }, []);
  const handleSearch = () => {
    api
      .get("/search-account/" + filteredData)
      .then((response) => {
        console.log("Response from API:", response.data);
        Navigate("/account/search/" + filteredData);
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
    api.get("/edit-account/" + id).then(() => {
      Navigate("/edit-account/" + id);
    });
  };

  const [idselected, setidselected] = useState(0);

  const handleDelete = () => {
    api.post("/delete-account/" + idselected).then(() => {
      window.location.reload();
    }),
      alert("Data berhasil dihapus");
  };

  const handleopen = (id: number) => {
    open();
    setidselected(id);
  };

  const rows = chunkdata[activePage - 1]?.map((row) => (
    <Table.Tr key={row.id} fw={500}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
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
  const adduser = useForm({
    initialValues: {
      name: "",
      password: "",
      email: "",
      roleid: "",
    },
    // Validasi formulir
    validate: {
      name: (value) => {
        if (value.length === 0) {
          return "email is required";
        }
        return null;
      },
      email: (value) => {
        if (value.length === 0) {
          return "email is required";
        }
        return null;
      },
      roleid: (value) => {
        if (value.length === 0) {
          return "role is required";
        }
        return null;
      },
    },
  });

  const handleAdduser = () => {
    if (adduser) {
      // Mengubah format tanggal menjadi "yyyy/mm/dd"

      const uploaddata = {
        name: adduser.values.name,
        email: adduser.values.email,
        password: adduser.values.password,
        roleid: adduser.values.roleid,
      };

      // console.log("User values:", uploaddata);

      api
        .post("/register", uploaddata)
        .then(() => {
          // console.log(response);

          notifications.show({
            title: "User berhasil dikirim",
            message: `Akun "${uploaddata.name}" berhasil dikirim`,
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
            message: `Gagal mengirim akun`,
            color: "red",
          });
        });
    }
  };
  return (
    <div className={classes.body}>
      <Container size="default" pt="md">
        <Title c={theme.colors.green[9]}>Account Dashboard</Title>
        <Tabs defaultValue="index" color={theme.colors.green[9]}>
          <Tabs.List c={theme.colors.green[9]} justify="flex-start">
            <Tabs.Tab value="index" fw={700}>
              Index
            </Tabs.Tab>
            <Tabs.Tab value="add" fw={700}>
              Add User
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
                  onClick={() => handleSearch}
                >
                  <IconArrowRight
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
            />
            <Center>
              <Table.ScrollContainer minWidth="50vw" w="70vw" h="65vh">
                <Table stickyHeader highlightOnHover verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr c={theme.colors.green[9]}>
                      <Table.Th>Id</Table.Th>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Role</Table.Th>
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
            <FormProvider form={adduser}>
              <form onSubmit={adduser.onSubmit(handleAdduser)}>
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
