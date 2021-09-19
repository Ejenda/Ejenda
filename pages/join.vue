<template>
  <!-- keep this in sync with login.vue -->
  <main
    class="
      min-h-screen
      flex
      justify-center
      items-center
      bg-red-300 bg-gradient-to-r
      from-red-500
      dark:from-gray-800
      dark:bg-gray-400
    "
  >
    <div
      class="
        bg-white
        p-8
        max-w-lg
        w-full
        h-auto
        rounded-lg
        bg-opacity-30
        backdrop-blur-lg
      "
    >
      <div class="text-center">
        <img class="mx-auto h-10 w-auto" src="/logo.svg" alt="Ejenda" />
        <h2 class="font-bold text-2xl my-2 text-red-900">Join Ejenda</h2>
        <p class="my-2 text-gray-700">
          Or
          <nuxt-link
            to="/login"
            class="
              text-red-700
              border-b-2 border-transparent
              hover:border-red-600
              cursor-pointer
              transition-all
              duration-500
            "
            >login to an existing account</nuxt-link
          >
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
        <strong class="font-bold">Error creating account!</strong>
        <span class="block sm:inline">
          {{ error }}
        </span>
      </div>
      <form @submit.prevent="signup" class="flex items-center flex-col">
        <label
          class="
            my-2
            w-full
            cursor-pointer
            text-gray-800
            font-medium
            transition-colors
            text-sm
            focus-within:text-red-700
          "
          for="username"
          >Username
          <input
            type="text"
            id="username"
            name="username"
            v-model="form.username"
            class="
              p-2
              my-1
              w-full
              outline-none
              transition-all
              shadow-md
              duration-300
              rounded
              focus:ring-4
              hover:ring-2 hover:ring-red-500 hover:ring-opacity-20
              focus:ring-red-500 focus:ring-opacity-50
              block
              focus:outline-none
            "
        /></label>

        <label
          class="
            my-2
            w-full
            cursor-pointer
            text-gray-800
            font-medium
            transition-colors
            text-sm
            focus-within:text-red-700
          "
          for="password"
          >Password
          <input
            type="password"
            id="password"
            name="password"
            v-model="form.password"
            class="
              p-2
              my-1
              w-full
              outline-none
              transition-all
              shadow-md
              duration-300
              rounded
              focus:ring-4
              hover:ring-2 hover:ring-red-500 hover:ring-opacity-20
              focus:ring-red-500 focus:ring-opacity-50
              block
              focus:outline-none
            "
          />
        </label>
        <div v-if="zxcvbnResults.feedback" class="text-sm text-gray-600 w-full my-2">
          <span class="inline">Password strength:</span>
          <span
            class="rounded-full h-8 w-8 inline-flex items-center justify-center"
            :class="pillSwitcher"
            >{{ zxcvbnResults.score }}/4</span
          >
          <span
            v-show="zxcvbnResults.feedback.warning"
            class="text-red-300 block"
            >{{ zxcvbnResults.feedback.warning }}</span
          >
          <div v-show="zxcvbnResults.score < 3">
            <ul>
              <li
                v-for="suggestion of zxcvbnResults.feedback.suggestions"
                :key="suggestion"
              >
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
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
          Sign up
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import cookies from "js-cookie";
import { zxcvbn, ZxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

const password = "somePassword";
const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

ZxcvbnOptions.setOptions(options);

export default {
  middleware: "not-authenticated",
  layout: "custom",
  head() {
    return {
      title: `join`,
    };
  },
  computed: {
    pillSwitcher: function () {
      return {
        "bg-red-500": this.zxcvbnResults.score < 2,
        "bg-yellow-500": this.zxcvbnResults.score == 2,
        "bg-green-300 text-white": this.zxcvbnResults.score == 3,
        "bg-green-500": this.zxcvbnResults.score == 4,
      };
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
      zxcvbnResults: {},
    };
  },
  watch: {
    "form.password": function () {
      this.zxcvbnResults = zxcvbn(this.form.password);
    },
  },
  methods: {
    async signup() {
      if (this.zxcvbnResults.score >= 3) {
        this.error = "";
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
      } else {
        this.error = "Please make your password stronger";
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
        cookies.set("token", data.token, {
          expires: new Date(253402300000000),
        });
        try {
          await this.$store.dispatch("auth/login", data.token);
          this.$router.replace(`/onboarding`);
        } catch (err) {
          console.error(`Login failed: ${err}`);
        }
      }
      //cookies.set('token', token, { expires: new Date(253402300000000) })
    },
  },
};
</script>
