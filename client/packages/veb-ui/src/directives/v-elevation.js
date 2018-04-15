export default {
    bind: (el, binding, vnode) => {
        const $ = require('jquery')
        const $el = $(el)

        const replaceAll = function (string, search, replacement) {
            var target = string
            return target.split(search).join(replacement)
        }

        const computed = function () {
            const oldBoxShadow = $el.css('box-shadow')
            let backgroundColor = $el.css('background-color')

            if (!backgroundColor || backgroundColor.indexOf('gradient') >= 0) {
                return
            }
            backgroundColor = backgroundColor.slice(0, backgroundColor.length - 1)
            const newBoxShadow = replaceAll(replaceAll(oldBoxShadow, 'rgba(0, 0, 0', backgroundColor), 'rgb', 'rgba')
            el.style.boxShadow = newBoxShadow
        }

        $(document).ready(() => {
            window.setTimeout(function () {
                computed()
            }, 500)
        })

        $(window).on('popstate', function (e) {
            var state = e.originalEvent.state
            if (state) {
                window.setTimeout(function () {
                    computed()
                }, 500)
            }
        })
    }
}
