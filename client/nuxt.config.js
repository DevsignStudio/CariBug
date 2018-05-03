module.exports = {
    /*
  ** Headers of the page
  */
    head: {
        title: 'caribug-client',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
  ** Customize the progress bar color
  */
    mode: 'spa',
    loading: { color: '#FFFFFF',  },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/apollo'],
    plugins: ['~/plugins/veb.js', '~/plugins/vue-highlight.js', '~/plugins/vue-moment.js'],
    apollo: {
        clientConfigs: {
            default: '~/apollo/config/default.js'
        }
    },
    /*
  ** Build configuration
  */
    build: {
        vendor: ['vue-apollo', 'vue-highlight.js'],
        /*
    ** Run ESLint on save
    */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
