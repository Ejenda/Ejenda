export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "E-jenda",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "E-jenda is the solution to paper agendas. It stores all of your subjects digitally, saving on paper and creating a convienient space for assignments. Check back soon for more features, as E-jenda is in beta.",
      },
    ],
    link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: [
    { src: "~/plugins/modules.js" },
    { src: "~/plugins/cmodules.client.js" },
    { src: "~/plugins/auth.js" },
  ],
  colorMode: {
    classSuffix: "",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  env: {
    backendURL: process.env.BACKENDURL || "http://localhost:8000",
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode" /*"nuxt-vite"*/],

  tailwindcss: {
    config: {
      mode: "jit",
      darkMode: "class",
      plugins:[require('@tailwindcss/forms'),    ]
    },
  },
  serverMiddleware: ["~/server-middleware/server.js"],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/pwa", "@nuxtjs/svg",],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {transpile: ['vue-final-modal']},
  generate: {
    fallback: true,
  },
  pwa: {
    manifest: {
      name: "E-jenda",
      start_url: "/app",
    },
  },
};
