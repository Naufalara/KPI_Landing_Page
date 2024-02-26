import {
  Container,
  Title,
  useMantineTheme,
  Button,
  TextInput,
  Select,
  PasswordInput,
} from "@mantine/core";
import classes from "./account.module.css";
import { useEffect, useState } from "react";
import { createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

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
        label="password"
        placeholder="Masukkan Password"
        radius="xl"
        {...form.getInputProps("password")}
      />
      <Select
        label="Role"
        placeholder="Pilih Role"
        data={role}
        pt="md"
        radius="xl"
        {...form.getInputProps("roleid")}
      />
    </Container>
  );
}

export default function AccountEdit() {
  const theme = useMantineTheme();

  const { id } = useParams();
  const edituser = useForm({
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
      password: (value) => {
        if (value.length === 0) {
          return "password is required";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/edit-account/${id}`);
        const data = response.data;
        // console.log("imagebefore:", imagebefore);
        // console.log("data response:", response);

        // const dateString = data.tanggal;
        // const isoString = new Date(dateString).toISOString();
        const fixingdata = {
          name: data.name,
          email: data.email,
          password: "",
          roleid: data.roleid,
        };

        console.log("fixingdata:", fixingdata);
        edituser.setInitialValues(fixingdata);
        edituser.setValues(fixingdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const Navigate = useNavigate();

  const handleedituser = () => {
    if (edituser) {
      const uploaddata = {
        name: edituser.values.name,
        email: edituser.values.email,
        password: edituser.values.password,
        roleid: edituser.values.roleid,
      };

      console.log("User values:", uploaddata);

      api
        .post("/update-account/" + id, uploaddata)
        .then((response) => {
          console.log(response);

          notifications.show({
            title: "User berhasil diedit",
            message: `User "${uploaddata.name}" berhasil diedit`,
            color: "green",
          });

          // Refresh the page
          setTimeout(() => {
            Navigate("/account");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          notifications.show({
            title: "Gagal",
            message: `Gagal mengirim user`,
            color: "red",
          });
        });
    }
  };
  return (
    <div className={classes.body}>
      <Container size="default" pt="md" c={theme.colors.green[9]}>
        <FormProvider form={edituser}>
          <form onSubmit={edituser.onSubmit(handleedituser)}>
            <Title order={1}>Edit Account</Title>
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
