<template>
  <div class="p-2 flex justify-between dark:bg-gray-900 ">
    <div class=" font-bold">
      <img
        class="rounded-full h-10 w-10 inline align-text-bottom"
        src="~/static/logo.svg"
      />
      <nuxt-link  to="/" class="text-4xl font-black dark:text-white dark:text-opacity-87 font-sans">ejenda<span class="text-red-600">.</span></nuxt-link>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-col ml-2 items-center justify-center">
        <div
          v-if="$auth.loggedIn"
          class="flex justify-center content-center flex-col"
        >
          <div class="flex flex-row">
            <span class="text-base dark:text-white dark:text-opacity-87">Hi, {{ $auth.user.name }}</span>
            <nuxt-link :to="'/settings'" class="dark:text-white dark:text-opacity-87 mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </nuxt-link>

            <button @click="logout" class="mx-1 dark:text-white dark:text-opacity-87">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div v-else>
          <nuxt-link  to="/login" class="px-2 dark:text-white">Login</nuxt-link>
          <nuxt-link  to="/join" class="dark:text-white">Join</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { version } from "~/package.json";
export default {
  data() {
    return { version };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="postcss">
.link {
  @apply text-red-400;
}
</style>
