<template>
  <!-- keep this in sync with join.vue -->
    <main
    class="min-h-screen flex justify-center items-center w-screen bg-red-300 bg-gradient-to-r from-red-500"
  >
    <div class="bg-white p-8  max-w-lg w-full h-auto rounded-r-lg bg-opacity-30 backdrop-blur-lg">
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="/logo.svg" alt="Ejenda" />
        <h2 class="font-bold text-2xl my-2 text-red-900">Sign in to your account</h2>
        <p class="my-2 text-gray-700">
          Or
          <nuxt-link to="/join" class="text-red-700 border-b-2 border-transparent hover:border-red-600 cursor-pointer transition-all duration-500">create an account</nuxt-link>
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
      <form @submit.prevent="login" class="flex items-center flex-col">
        <label class="my-2 w-full cursor-pointer text-gray-800 font-medium transition-colors text-sm focus-within:text-red-700"
          >Username
        <input
          type="text"
          id="username"
          name="username"
          v-model="form.username"
          placeholder="Username"
          class="p-2 my-1 w-full outline-none transition-all shadow-md duration-300 rounded focus:ring-4 hover:ring-2 hover:ring-red-500 hover:ring-opacity-20 focus:ring-red-500 focus:ring-opacity-50 block focus:outline-none"
        />
        </label>

        <label class="my-2 w-full cursor-pointer text-gray-800 font-medium transition-colors text-sm focus-within:text-red-700"
          >Password
        <input
          type="text"
          id="password"
          name="password"
          v-model="form.password"
          placeholder="Password"
          class="p-2 my-1 w-full outline-none transition-all shadow-md duration-300 rounded focus:ring-4 hover:ring-2 hover:ring-red-500 hover:ring-opacity-20 focus:ring-red-500 focus:ring-opacity-50 block focus:outline-none"
        />
        </label>
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
            hover:bg-red-600
            active:scale-95 transition-all duration-300 focus:ring-4 focus:ring-red-600 focus:ring-opacity-50
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
