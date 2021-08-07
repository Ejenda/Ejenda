<template>
  <div class="flex flex-col bg-red-100 dark:bg-gray-500 min-h-screen">
    <div class="bg-red-600">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-red-800">
              <!-- Heroicon name: outline/speakerphone -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden"> Have any feedback? </span>
              <span class="hidden md:inline">
                Have any feedback? Send it at GrahamSH.com
              </span>
            </p>
          </div>
          <div
            class="
              order-3
              mt-2
              flex-shrink-0
              w-full
              sm:order-2 sm:mt-0 sm:w-auto
            "
          >
            <a
              href="https://grahamsh.com/contact"
              class="
                flex
                items-center
                justify-center
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-red-600
                bg-white
                hover:bg-red-50
              "
            >
              Send feedback
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="p-1 flex justify-between">
      <div class="font-serif font-bold text-4xl">
        <img
          class="rounded-full h-10 w-10 inline align-text-bottom"
          src="~/static/logo.svg"
        />
        <nuxt-link to="/">E-jenda</nuxt-link>
        <span class="text-base">v{{ version }}</span>
        <div v-if="$auth.loggedIn" >
        <span class="text-base">Hi, {{ $auth.user.name }}</span>
        <button @click="logout">Logout</button>
        </div>
        <div v-else><nuxt-link to="/login">Login</nuxt-link> <nuxt-link to="/join">Join</nuxt-link></div>
      </div>
      <nuxt-link
        to="/faq"
        class="
          bg-red-300
          text-red-100
          hover:bg-red-700 hover:text-white
          px-3
          py-2
          rounded-md
        "
        >FAQ</nuxt-link
      >
    </div>

    <Nuxt />
    <footer class="bg-red-50 p-4 dark:bg-gray-800 dark:text-white">
      <span class="text-1xl text-red-600 font-bold p-4">© 2021 GrahamSH</span>
      <select
        class="p-2 rounded dark:bg-gray-700"
        v-model="$colorMode.preference"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </footer>
    <div class="inset-x-0 bottom-0 rounded sticky" v-show="!hide">
      <div
        class="
          max-w-7xl
          mx-auto
          py-3
          px-3
          sm:px-6
          lg:px-8
          m-2
          bg-red-600
          rounded
        "
      >
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-red-800">
              <!-- Heroicon name: outline/speakerphone -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class=""> Coming soon: Ejenda Blocks </span>
            </p>
          </div>
          <div
            class="
              order-3
              mt-2
              flex-shrink-0
              w-full
              sm:order-2 sm:mt-0 sm:w-auto
            "
          >
            <nuxt-link
              to="/blocks"
              class="
                flex
                items-center
                justify-center
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-red-600
                bg-white
                hover:bg-red-50
              "
            >
              Learn more
            </nuxt-link>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              class="
                -mr-1
                flex
                p-2
                rounded-md
                hover:bg-red-500
                focus:outline-none focus:ring-2 focus:ring-white
                sm:-mr-2
              "
              @click="hideComingSoonPopup"
            >
              <span class="sr-only">Dismiss</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { version } from '~/package.json'
export default {
  data() {
    return { version, hide: true }
  },
  mounted() {
    this.hide = localStorage.getItem('hide') ?? false
  },
  methods: {
    hideComingSoonPopup() {
      this.hide = true
      localStorage.setItem('hide', 'true')
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>
<style lang="postcss">
.mx-input {
  @apply !h-[40px];
  border: none !important;
  box-shadow: none !important;
}
.link {
  @apply text-red-400;
}
</style>
