// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "wss",
      },
    },
  },
});
