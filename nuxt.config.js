import colors from 'vuetify/es5/util/colors'

export default function () {
  return {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      titleTemplate: '%s - E-learningPlatform',
      title: 'E-learningPlatform',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      proxy: true, // Can be also an object with default options
    },

    proxy: {
      '/api': { target: process.env.BASE_URL, changeOrigin:true, pathRewrite: { '^/api/': '/' } },
      '/graphql': {target: process.env.BASE_URL, changeOrigin:false },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
      customVariables: ['~/assets/variables.scss'],
      theme: {
        dark: false,
        themes: {
          light: {
            primary: '#0156D2',
            accent: '#086CFE',
            secondary: '#D27D01',
            analogous: '#1401D2',
            warning: colors.amber.base,
            info: '#01BFD2',
            error: '#D20156',
            success: '#56D201',
          },
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
          },
        },
      },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
  }
}
