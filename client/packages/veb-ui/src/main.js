import components from './components.js'
import directives from './directives.js'
import Snackbar from './function/snackbar'
import Confirmation from './function/confirmation'

export const VebUI = {
    install (Vue, options = {}) {
        require('nouislider/distribute/nouislider.css')
        require('./css/veb.css')
        require('mdi/css/materialdesignicons.css')
        components(Vue, options)
        directives(Vue, options)
        Vue.prototype.$snackbar = Snackbar
        Vue.prototype.$confirmation = Confirmation
    }
}

export default {
    VebUI,
    Snackbar,
    Confirmation
}
