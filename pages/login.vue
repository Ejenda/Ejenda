<template>
  <!-- keep this in sync with join.vue -->
  <main
    class="min-h-screen flex bg-red-300 bg-gradient-to-r from-red-500"
  >
    <div class="bg-white p-8  max-w-lg w-full h-screen rounded-r-lg">
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="/logo.svg" alt="Ejenda" />
        <h2 class="font-bold text-2xl my-2">Sign in to your account</h2>
        <p class="my-2 text-gray-500">
          Or
          <nuxt-link to="/join">create an account</nuxt-link>
        </p>
      </div>
      <div
        class="
          bg-red-100
          border border-red-400
          text-red-700
          px-4
          py-3
          my-2
          rounded
        "
        v-if="error"
      >
        <strong class="font-bold">Error logging in!</strong>
        <span class="block sm:inline">
          {{ error }}
        </span>
      </div>
      <form @submit.prevent="login">
        <label class="text-gray-500 font-medium text-sm" for="username"
          >Username</label
        >
        <input
          type="text"
          id="username"
          name="username"
          v-model="form.username"
          class="border-2 p-1 my-1 w-full rounded-md block"
        />

        <label class="text-gray-500 font-medium text-sm" for="password"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          v-model="form.password"
          class="border-2 p-1 my-1 w-full rounded-md block"
        />
        <button
          type="submit"
          class="
            bg-red-500
            text-white
            w-full
            text-center
            font-bold
            p-2
            mt-2
            rounded-lg
            cursor-pointer
          "
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
      title: `login`,
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
            path: "/",
          });
          this.$socket.emit("updateUser", data.token);
        } catch (err) {
          console.error(`login failed: ${err}`);
        }
      }
      //cookies.set('token', token, { expires: new Date(253402300000000) })
    },
  },
};
</script>
