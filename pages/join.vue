<template>
  <!-- keep this in sync with join.vue -->
  <main class="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-100">
    <div class="bg-white shadow p-8 rounded-xl max-w-lg w-full">
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="/brand/logo-invert.svg" alt="wasteof.money" />
        <h2 class="font-bold text-2xl my-2">Join wasteof.money</h2>
        <p class="my-2 text-gray-500">
          Or
          <nuxt-link to="/login">login to an existing account</nuxt-link>
        </p>
      </div>
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" v-if="error">
        <strong class="font-bold">Error logging in!</strong>
        <span class="block sm:inline">
          {{ error }}
        </span>
      </div>
      <form @submit.prevent="signup">
        <label class="text-gray-500 font-medium text-sm" for="username">Username</label>
        <input type="text" id="username" name="username" v-model="form.username" class="border-2 p-1 my-1 w-full rounded-md block" />

        <label class="text-gray-500 font-medium text-sm" for="password">Password</label>
        <input type="password" id="password" name="password" v-model="form.password" class="border-2 p-1 my-1 w-full rounded-md block" />
        <button type="submit" class="bg-primary-500 text-white w-full text-center font-bold p-2 mt-2 rounded-lg cursor-pointer">Sign up</button>
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
      title: `join`,
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
    async signup() {
      let res = await fetch(`${process.env.backendURL}/users`, {
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
        // login using /session endpoint (copied from login page)
        this.login(this.form.username, this.form.password);
      }
      //cookies.set('token', token, { expires: new Date(253402300000000) })
    },
    async login(username, password) {
      let res = await fetch(`${process.env.backendURL}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      let data = await res.json();
      if (data.error) {
        this.error = data.error;
      } else {
        cookies.set("token", data.token, { expires: new Date(253402300000000) });
        try {
          await this.$store.dispatch("auth/login", data.token);
          this.$router.push({
            path: `/onboarding`,
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