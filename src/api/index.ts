import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6969", //your api URL
});

export default api;
