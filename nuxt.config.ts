// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
    "@scalar/nuxt",
  ],
  nitro: {
    experimental: {
      openAPI: true,
      tasks: true,
    },
  },
  imports: {
    dirs: ["composables/**"],
    presets: [
      {
        from: "@tanstack/vue-query",
        imports: [{ name: "*", as: "vq" }],
      },
    ],
  },

  plausible: {
    apiHost: "https://possible.grahamsh.com"
  },
});