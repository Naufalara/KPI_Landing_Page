import {
  Container,
  Title,
  useMantineTheme,
  Button,
  TextInput,
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
import { useNavigate, useParams } from "react-router-dom";

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

  const { id } = useParams();
  useEffect(() => {
    api.get(`/edit-role/${id}`).then((response) => {
      setSelectedValue(response.data.permissions);
    });
  }, []);

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
  //   console.log("filteredData:", filteredData);

  const theme = useMantineTheme();

  const { id } = useParams();
  const editrole = useForm({
    initialValues: {
      role: "",
      permission: [],
    },
    // Validasi formulir
    validate: {
      role: (value) => {
        if (value.length === 0) {
          return "Role Name is required";
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
  // console.log("editrole:", editrole.values);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/edit-role/${id}`);
        const data = response.data;
        // console.log("data:", data.role);
        const fixingdata = {
          role: data.role,
          permission: data.permissions,
        };

        console.log("fixingdata:", fixingdata);
        editrole.setInitialValues(fixingdata);
        editrole.setValues(fixingdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const Navigate = useNavigate();

  const handleeditrole = () => {
    if (editrole) {
      const uploaddata = {
        name: editrole.values.role,
        permissions: editrole.values.permission,
      };

      console.log("role values:", uploaddata);

      api
        .post("/update-role/" + id, uploaddata)
        .then(() => {
          notifications.show({
            title: "role berhasil dikirim",
            message: `data "${uploaddata.name}" berhasil dikirim`,
            color: "green",
          });

          // Refresh the page
          Navigate("/role-permission");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          notifications.show({
            title: "Gagal",
            message: `Gagal mengirim data`,
            color: "red",
          });
        });
    }
  };
  return (
    <div className={classes.body}>
      <Container size="default" pt="md">
        <Title c={theme.colors.green[9]}>Role & Permission Dashboard</Title>

        <FormProvider form={editrole}>
          <form onSubmit={editrole.onSubmit(handleeditrole)}>
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
      </Container>
    </div>
  );
}
