import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  css: ['~/assets/css/tailwind.css'],
  vite: { plugins: [tailwindcss()] },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
})