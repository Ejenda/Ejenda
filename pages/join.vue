<template>
  <!-- keep this in sync with join.vue -->
  <main
    class="
      min-h-screen
      flex
      bg-red-300
      dark:bg-gray-700
      bg-gradient-to-r
      from-red-500
      dark:from-gray-900
      justify-center
      items-center
    "
  >
    <div
      class="
        bg-white
        dark:bg-gray-600
        p-12
        max-w-lg
        w-1/2
        h-1/2
        rounded-lg
        bg-opacity-75
      "
    >
      <div class="text-center">
        <img
          class="mx-auto h-10 w-auto rounded-md"
          src="/logo.svg"
          alt="Ejenda"
        />
        <h2
          class="font-bold text-2xl my-2 dark:text-white dark:text-opacity-90"
        >
          Join Ejenda
        </h2>
        <p class="my-2 text-gray-500 dark:text-white dark:text-opacity-70">
          Or
          <nuxt-link to="/login">login to an existing account</nuxt-link>
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
      <form @submit.prevent="signup">
        <label
          class="
            text-gray-500
            dark:text-white dark:text-opacity-70
            font-medium
            text-sm
          "
          for="username"
          >Username</label
        >
        <input
          type="text"
          id="username"
          name="username"
          v-model="form.username"
          class="border-2 p-1 my-1 w-full rounded-md block"
        />

        <label
          class="
            text-gray-500
            dark:text-white dark:text-opacity-70
            font-medium
            text-sm
          "
          for="password"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          v-model="form.password"
          class="border-2 p-1 my-1 w-full rounded-md block"
        />

        <div
          v-if="zxcvbnResults.feedback"
          class="text-sm text-gray-600 dark:text-white dark:text-opacity-70"
        >
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
          <label class="block">I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> <input type="checkbox" v-model="agreeToTOC" class="p-1 rounded-md"/></label>
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
      title: `Join - Ejenda`,
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
      agreeToTOC: false
    };
  },
  watch: {
    "form.password": function () {
      this.zxcvbnResults = zxcvbn(this.form.password);
    },
  },
  methods: {
    async signup() {
      if (this.agreeToTOC) {
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
      } else {
        this.error = "Please agree to the terms and conditions"
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
