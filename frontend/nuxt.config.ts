// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Inter': [300, 400, 500, 600, 700, 800, 900],
      'Outfit': [400, 500, 600, 700, 800],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: 'Capital Pets | Alimento, Ropa & Accesorios para Mascotas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Capital Pets - Tu tienda de confianza para alimento, ropa, accesorios y repostería para mascotas. Productos de calidad para perros y gatos.' },
        { name: 'theme-color', content: '#3D5192' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000/api',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
});
