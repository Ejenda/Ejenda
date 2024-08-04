import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("session"); // get token from cookies
  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
    const data = await $fetch("/api/user/info", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (data) {
      user.value = data;
    }
  }
});
