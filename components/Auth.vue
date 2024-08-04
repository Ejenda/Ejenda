<template>
  <div class="flex h-[calc(100vh-116px)] items-center">
    <div class="mx-auto w-full max-w-sm border rounded-md h-min">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="whitespace-nowrap font-semibold tracking-tight text-2xl">
          {{ actionStrings.cta }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ actionStrings.subline }}
        </p>
      </div>
      <div class="p-6">
        <form class="flex flex-col gap-4">
          <UFormGroup label="Username">
            <UInput
              type="text"
              id="username"
              v-model="user.username"
              required
              autocomplete="username"
              size="md"
          /></UFormGroup>
          <UFormGroup label="Password">
            <UInput
              type="password"
              id="password"
              v-model="user.password"
              required
              autocomplete="current-password"
              size="md"
          /></UFormGroup>
        </form>
        <UButton type="submit" @click="login" size="md" block class="mt-8">
          {{ actionStrings.cta }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created
const props = defineProps<{
  join: boolean;
}>();
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: "",
  password: "",
});
const router = useRouter();

const login = async () => {
  if (!user.value.username || !user.value.password) {
    useToast().add({
      title: "Error",
      description: "Please enter a username and password.",
    });
    return;
  }
  if (props.join) {
    const data = await $fetch("/api/user/create", {
      async onResponseError({ request, response, options }) {
        // Log error
        useToast().add({
          title: "Error",
          description: response._data.message,
          actions: [
            {
              label: "Go to login",
              click: () => {
                useRouter().push("/login");
              },
            },
          ],
        });
      },

      method: "POST",
      body: {
        name: user.value.username,
        password: user.value.password,
      },
    });

    if (!data.id) {
      return;
    }
  }
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated.value) {
    router.push("/");
  }
};
const actionStrings = computed(() =>
  props.join
    ? {
        cta: "Register",
        subline: "Enter a username and password to create your account.",
      }
    : {
        cta: "Login",
        subline: "Enter your username and password to access your account.",
      }
);
</script>
