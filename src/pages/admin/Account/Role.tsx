import {
  Container,
  Table,
  Tabs,
  Title,
  useMantineTheme,
  Button,
  Stack,
  TextInput,
  Pagination,
  Center,
  Modal,
  Badge,
  useCombobox,
  Pill,
  Combobox,
  Group,
  CheckIcon,
  PillsInput,
} from "@mantine/core";
import classes from "./account.module.css";
import { useEffect, useState } from "react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

interface roleItem {
  id: number;
  role: string;
  permissions: string[];
}

// useEffect(() => {});

interface roleValues {
  role: string;
  permission: string[];
}

interface Permission {
  id: number;
  name: string;
}

const [FormProvider, useFormContext, useForm] = createFormContext<roleValues>();

function FormField() {
  const theme = useMantineTheme();

  const form = useFormContext();

  const [dataPermission, setdataPermission] = useState<Permission[]>([]);

  useEffect(() => {
    api
      .get("/permission")
      .then((response) => {
        setdataPermission(response.data);
        // console.log("Response from API:", response.data); // Tampilkan hasil API ke konsol
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const formdatanow = {
    role: form.values.role,
    permission: selectedValue,
  };

  useEffect(() => {
    form.setValues(formdatanow);
  }, [selectedValue]);

  const handleValueSelect = (val: string) =>
    setSelectedValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setSelectedValue((current) => current.filter((v) => v !== val));

  const values = selectedValue.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = dataPermission
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option
        value={item.name}
        key={item.id}
        active={selectedValue.includes(item.name)}
      >
        <Group gap="sm">
          {selectedValue.includes(item.name) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Container size="default">
      <TextInput
        label="Role Name"
        placeholder="Masukkan Nama"
        radius="xl"
        {...form.getInputProps("role")}
      />

      <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.DropdownTarget>
          <PillsInput
            label="Permission"
            onClick={() => combobox.openDropdown()}
            radius="xl"
            pt="md"
            color={theme.colors.green[9]}
            {...form.getInputProps("permission")}
          >
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Search values"
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(
                        selectedValue[selectedValue.length - 1]
                      );
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found...</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Container>
  );
}

export default function Role() {
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  //   console.log("filteredData:", filteredData);

  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const [terbuka, { open, close }] = useDisclosure(false);

  const Navigate = useNavigate();

  const [index, setIndex] = useState<roleItem[]>([]);

  useEffect(() => {
    api
      .get("/role-admin")
      .then((response) => {
        // console.log("Response from API:", response.data); // Tampilkan hasil API ke konsol
        setIndex(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Tangkap dan tampilkan kesalahan ke konsol
      });
  }, []);

  const newsdata = index;

  const chunkdata = chunk(newsdata, 5);

  // Function to handle changing the active page
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleEdit = (id: number) => {
    Navigate("/role-edit/" + id);
  };

  const [idselected, setidselected] = useState(0);

  const handleDelete = () => {
    api
      .post("/destroy-role/" + idselected)
      .then(() => {
        window.location.reload();
        notifications.show({
          title: "Role berhasil dihapus",
          message: `Role berhasil dihapus`,
          color: "green",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        notifications.show({
          title: "Gagal",
          message: error,
          color: "red",
        });
      });
  };

  const handleopen = (id: number) => {
    open();
    setidselected(id);
  };

  const rows = chunkdata[activePage - 1]?.map((row) => (
    <Table.Tr key={row.id} fw={500}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>
        {Array.isArray(row.permissions)
          ? row.permissions.map((permission) => (
              <Badge key={permission} color={theme.colors.green[9]} ml="sm">
                {permission}
              </Badge>
            ))
          : row.permissions}
      </Table.Td>
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
  const addrole = useForm({
    initialValues: {
      role: "",
      permission: [],
    },
    // Validasi formulir
    validate: {
      role: (value) => {
        if (value.length === 0) {
          return "Role name is required";
        }
        return null;
      },
      permission: (value) => {
        if (value.length === 0) {
          return "Permission is required";
        }
        return null;
      },
    },
  });
  // console.log("addrole:", addrole.values);

  const handleAddrole = () => {
    if (addrole) {
      // Mengubah format tanggal menjadi "yyyy/mm/dd"

      const uploaddata = {
        name: addrole.values.role,
        permissions: addrole.values.permission,
      };

      console.log("role values:", uploaddata);

      api
        .post("/store-role", uploaddata)
        .then(() => {
          // console.log(response);

          notifications.show({
            title: "role berhasil dikirim",
            message: `Role "${uploaddata.name}" berhasil dikirim`,
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
            message: `Gagal mengirim role`,
            color: "red",
          });
        });
    }
  };
  return (
    <div className={classes.body}>
      <Container size="default" pt="md">
        <Title c={theme.colors.green[9]}>Role & Permission Dashboard</Title>
        <Tabs defaultValue="index" color={theme.colors.green[9]}>
          <Tabs.List c={theme.colors.green[9]} justify="flex-start">
            <Tabs.Tab value="index" fw={700}>
              Index
            </Tabs.Tab>
            <Tabs.Tab value="add" fw={700}>
              Add Role
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="index">
            <Center>
              <Table.ScrollContainer minWidth="50vw" w="80vw" h="65vh">
                <Table stickyHeader highlightOnHover verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr c={theme.colors.green[9]}>
                      <Table.Th>Id</Table.Th>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Permission</Table.Th>
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
            <FormProvider form={addrole}>
              <form onSubmit={addrole.onSubmit(handleAddrole)}>
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
