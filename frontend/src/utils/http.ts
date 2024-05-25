import axios from "axios";
import { env } from "./env";

const data = localStorage.getItem("pttk_auth");
let token = null;

if (data) {
  const jsonData = JSON.parse(data);
  token = jsonData?.state.token;
}

const _http = axios.create({
  baseURL: env.API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default _http;