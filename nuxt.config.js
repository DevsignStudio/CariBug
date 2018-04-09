module.exports = {
    /*
  ** Headers of the page
  */
    head: {
        title: 'starter',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    mode: 'spa',
    /*
  ** Global CSS
  */
    css: ['~/assets/css/main.css'],
    /*
  ** Add axios globally
  */
    modules: ['@nuxtjs/apollo'],
    plugins: ['~/plugins/veb.js', '~/plugins/vue-highlight.js', '~/plugins/vue-moment.js'],
    apollo: {
        clientConfigs: {
            default: '~/apollo/config/default.js'
        }
    },
    build: {
        vendor: ['axios', 'vue-apollo', 'vue-highlight.js'],
        /*
    ** Run ESLINT on save
    */
        extend (config, ctx) {
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    // exclude: /(node_modules)/
                    exclude: /node_modules/ && /packages/
                })
            }
        }
    }
}
