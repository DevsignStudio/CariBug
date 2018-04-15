import ripple from './directives/v-ripple'
import elevation from './directives/v-elevation'

export default function (Vue, options) {
    Vue.directive('ripple', ripple)
    Vue.directive('elevation', elevation)
}
