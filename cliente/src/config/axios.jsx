import axios from "axios";

const axiosCliente = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default axiosCliente;
