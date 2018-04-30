import components from './components.js'
import directives from './directives.js'
import Snackbar from './function/snackbar'

export const VebUI = {
    install (Vue, options = {}) {
        require('./css/veb.css')
        require('mdi/css/materialdesignicons.css')
        components(Vue, options)
        directives(Vue, options)
        Vue.prototype.$snackbar = Snackbar
    }
}

export default {
    VebUI,
    Snackbar
}
