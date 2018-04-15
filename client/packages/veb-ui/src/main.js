import components from './components.js'
import directives from './directives.js'

export const VebUI = {
    install (Vue, options = {}) {
        require('./css/veb.css')
        require('mdi/css/materialdesignicons.css')
        components(Vue, options)
        directives(Vue, options)
    }
}

export default {
    VebUI
}
