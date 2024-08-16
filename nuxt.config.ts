// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  // alias: {
  //   '@': './src',
  // },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  modules: [
    '@pinia/nuxt',
    'vue-yandex-maps/nuxt',
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: process.env.CLIENT_ID_GOOGLE,
  },
  yandexMaps: {
    apikey: process.env.YANDEX_MAP_API,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
