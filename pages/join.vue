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
          Join Ejenda
        </h2>
        <p class="my-2 text-gray-500 dark:text-white dark:text-opacity-70">
          Or
          <nuxt-link to="/login">login to an existing account</nuxt-link>
        </p>
      </div>
      <div
        class="my-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        v-if="error"
      >
        <strong class="font-bold">Error creating account!</strong>
        <span class="block sm:inline">
          {{ error }}
        </span>
      </div>
      <form @submit.prevent="signup">
        <label
          class="text-sm font-medium text-gray-500 dark:text-white dark:text-opacity-70"
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
          class="text-sm font-medium text-gray-500 dark:text-white dark:text-opacity-70"
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

        <div
          v-if="zxcvbnResults.feedback"
          class="text-sm text-gray-600 dark:text-white dark:text-opacity-70"
        >
          <span class="inline">Password strength:</span>
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-full"
            :class="pillSwitcher"
            >{{ zxcvbnResults.score }}/4</span
          >
          <span
            v-show="zxcvbnResults.feedback.warning"
            class="block text-red-300"
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
          <label class="block"
            >I agree to the
            <a href="/terms" target="_blank">Terms and Conditions</a> and
            <a href="/privacy" target="_blank">Privacy Policy</a>
            <input type="checkbox" v-model="agreeToTOC" class="rounded-md p-1"
          /></label>
        </div>
        <button
          type="submit"
          class="mt-2 w-full cursor-pointer rounded-lg bg-red-500 p-2 text-center font-bold text-white"
        >
          Sign up
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import cookies from "js-cookie";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";

export default {
  middleware: "not-authenticated",
  layout: "custom",
  head() {
    return {
      title: `Join - Ejenda`,
    };
  },
  mounted() {},
  computed: {
    pillSwitcher: function () {
      return {
        "bg-red-500": this.zxcvbnResults.score < 2,
        "bg-amber-500": this.zxcvbnResults.score == 2,
        "bg-emerald-300 text-white": this.zxcvbnResults.score == 3,
        "bg-emerald-500": this.zxcvbnResults.score == 4,
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
      agreeToTOC: false,
      zxcvbn: {},
      zxcvbnOptions: {}
    };
  },
  watch: {
    "form.password": async function () {
      await this.loadOptions();
      zxcvbnOptions.setOptions(this.zxcvbnOptions);

      this.zxcvbnResults = zxcvbn(this.form.password);
    },
  },
  methods: {
    async loadOptions() {
      if (this.zxcvbn.dictionary) return;
      const zxcvbnCommonPackage = await import(
        /* webpackChunkName: "zxcvbnCommonPackage" */ "@zxcvbn-ts/language-common"
      );
      const zxcvbnEnPackage = await import(
        /* webpackChunkName: "zxcvbnEnPackage" */ "@zxcvbn-ts/language-en"
      );

      this.zxcvbnOptions = {
        dictionary: {
          ...zxcvbnCommonPackage.default.dictionary,
          ...zxcvbnEnPackage.default.dictionary,
        },
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        translations: zxcvbnEnPackage.default.translations,
      };
    },

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
        this.error = "Please agree to the terms and conditions";
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
          this.$plausible.trackEvent("Join");
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
