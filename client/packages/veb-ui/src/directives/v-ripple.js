export default {
    bind: (el, binding, vnode) => {
        const $ = require('jquery')
        let background = null
        let takeFromFont = false
        if (binding.value) {
            if (binding.value.background) {
                background = binding.value.background
            } else if (binding.value.fromFont) {
                takeFromFont = true
            }
        }

        const $el = $(el)
        const computed = function () {
            let overflow = ''
            if(takeFromFont)  {
                background = $el.css('color')
                console.log(background)
            }

            $el.addClass('peper-ripple')
            $el.unbind('mousedown.ripple mouseup.ripple mouseout.ripple')
            $el.on('mousedown.ripple', function (e) {
                let square = $el.outerWidth()
                const height = $el.innerWidth()
                if (square < height) {
                    square = height
                }
                const offset = $el.offset()
                const offsetY = (e.pageY - offset.top)
                const offsetX = (e.pageX - offset.left)
                var $rippleCircle = $('<span class="ripple-circle"></span>')

                $el.addClass('clicked').append(
                    $rippleCircle.css({
                        'top': offsetY,
                        'left': offsetX,
                        'width': square,
                        'height': square,
                        'margin-top': -(square / 2),
                        'margin-left': -(square / 2)
                    })
                )

                if (!background) {
                    background = $rippleCircle.css('background-color')
                }
                overflow = $el.css('overflow')
                $el.css({
                    overflow: 'hidden'
                })
                $rippleCircle.css({
                    'background': background
                })
            }).on('mouseup.ripple mouseout.ripple', function (e) {
                $el.removeClass('clicked')
                    .children('.ripple-circle').fadeOut('slow', function () {
                        $(this).remove()
                        $el.css({
                            overflow: overflow
                        })
                    })
            })
        }

        $(document).ready(function () {
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
