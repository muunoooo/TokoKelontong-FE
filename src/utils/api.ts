import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

instance.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default instance;
