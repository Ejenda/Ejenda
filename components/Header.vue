<script setup>
import {useAuthStore} from "~/store/auth"

const {logout} = useAuthStore()
const {user, authenticated} = storeToRefs(useAuthStore())

</script>
<template>
  <header class="py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink aria-label="Home" href="/"
            ><ColorModeImage
              light="/wordmarks/light.svg"
              dark="/wordmarks/dark.svg"
              class="h-8 w-auto"
          /></NuxtLink>
          <div class="hidden -md:flex md:gap-x-6">
            <a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-600 dark:hover:text-slate-100"
              href="#features"
              >Features</a
            >
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8" v-if="!authenticated">
          
          <div class="hidden md:block">
            <NuxtLink
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/login"
              >Sign in</NuxtLink
            >
          </div>
          <NuxtLink
            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-600 text-white hover:text-slate-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600"
            color="primary"
            variant="solid"
            href="/register"
            v-if="!authenticated"
            ><span
              >Get started <span class="hidden lg:inline">today</span></span
            ></NuxtLink
          >
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8" v-else>
          {{ user.name }}
          <div class="block">
            <a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/app"
              >Dashboard</a
            >
          </div>
          <a
            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-600 text-white hover:text-slate-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600"
            color="primary"
            variant="solid"
            @click="logout"
            ><span>Logout</span></a
          >
        </div>
      </nav>
    </div>
  </header>
</template>
