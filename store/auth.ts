import { defineStore } from "pinia";

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    user: {},
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const data: any = await $fetch("/api/user/login", {
        ignoreResponseError: true,
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          name: username,
          password,
        },
      });

      if (!data.statusCode) {
        this.authenticated = true;
        this.user = data.user;
      } else {
        useToast().add({ title: "Error", description: data.message });
      }
    },
    logout() {
      const token = useCookie("session");
      this.authenticated = false;
      this.user = {};
      token.value = null;
    },
  },
});
