import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive
  console.log("authenticated", authenticated.value);
  // if token exists and url is /login redirect to homepage
  if (authenticated.value && to?.name === "login") {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!authenticated.value && to?.name !== "login") {
    console.log("aborting navigation");
    abortNavigation();
    return navigateTo("/login");
  }
});
