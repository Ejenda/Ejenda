<template>
  <!-- keep this in sync with join.vue -->
  <main
    class="flex min-h-screen items-center justify-center bg-red-300 bg-gradient-to-r from-red-500 dark:bg-gray-700 dark:from-gray-900"
  >
    <div
      class="h-1/2 w-1/2 max-w-lg rounded-lg bg-white bg-opacity-75 p-12 dark:bg-gray-600"
    >
      <div class="text-center">
        <img
          class="mx-auto h-10 w-auto rounded-md"
          src="/logo.svg"
          alt="Ejenda"
        />
        <h2
          class="my-2 text-2xl font-bold dark:text-white dark:text-opacity-90"
        >
          Sign in to your account
        </h2>
        <p class="dark my-2 text-gray-500 dark:text-white dark:text-opacity-70">
          Or
          <nuxt-link to="/join">create an account</nuxt-link>
        </p>
      </div>
      <div
        class="my-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        v-if="error"
      >
        <strong class="font-bold">Error logging in!</strong>
        <span class="block sm:inline">
          {{ error }}
        </span>
      </div>
      <form @submit.prevent="login">
        <label
          class="dark text-sm font-medium text-gray-500 dark:text-white dark:text-opacity-70"
          for="username"
          >Username</label
        >
        <input
          type="text"
          id="username"
          name="username"
          v-model="form.username"
          class="my-1 block w-full rounded-md border-2 p-1"
        />

        <label
          class="dark text-sm font-medium text-gray-500 dark:text-white dark:text-opacity-70"
          for="password"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          v-model="form.password"
          class="my-1 block w-full rounded-md border-2 p-1"
        />
        <button
          type="submit"
          class="mt-2 w-full cursor-pointer rounded-lg bg-red-500 p-2 text-center font-bold text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import cookies from "js-cookie";
export default {
  middleware: "not-authenticated",
  layout: "custom",
  head() {
    return {
      title: `Login - Ejenda`,
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      let res = await fetch(`/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      });
      let data = await res.json();
      if (data.error) {
        this.error = data.error;
      } else {
        cookies.set("token", data.token, {
          expires: new Date(253402300000000),
        });
        try {
          await this.$store.dispatch("auth/login", data.token);
          this.$router.push({
            path: "/app",
          });
        } catch (err) {
          console.error(`login failed: ${err}`);
        }
      }
      //cookies.set('token', token, { expires: new Date(253402300000000) })
    },
  },
};
</script>
