import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "aplication/json",
    "Access-Control-Allow-Origin": "http://localhost:5173", // Sesuaikan dengan origin aplikasi frontend Anda
    "Access-Control-Allow-Credentials": true, // Izinkan kredensial
  },
});

export default api;
