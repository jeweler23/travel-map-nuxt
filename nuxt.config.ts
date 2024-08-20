// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  srcDir: 'src/',

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  runtimeConfig: {
    googleClientId: process.env.CLIENT_ID_GOOGLE,
    accessToken: process.env.JWT_ACCESS_SECRET,
    refreshToken: process.env.JWT_REFRESH_SECRET,
  },

  modules: [
    '@pinia/nuxt',
    'vue-yandex-maps/nuxt',
    'nuxt-vue3-google-signin',
    // 'nuxt-mongoose',
    'nuxt-server-utils',
    // '@sidebase/nuxt-auth',
  ],
   mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
  googleSignIn: {
    clientId: process.env.CLIENT_ID_GOOGLE,
  },
  yandexMaps: {
    apikey: process.env.YANDEX_MAP_API,
  },
  nuxtServerUtils: {
    enabled: true, // default
    enableDevTools: true, // default
    mongodbUri: process.env.MONGODB_URI,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
