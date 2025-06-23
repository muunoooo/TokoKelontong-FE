import { defineStore } from "pinia";
import axios from "@/utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null as null | { email: string; name: string },
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await axios.post("/auth/login", { email, password });
      this.token = res.data.access_token;
      this.user = res.data.user || { email };
      localStorage.setItem("token", this.token);
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
    loadFromStorage() {
      this.token = localStorage.getItem("token") || "";
    },
    async fetchMe() {
      const res = await axios.get("/auth/me");
      this.user = res.data;
    },
  },
});
