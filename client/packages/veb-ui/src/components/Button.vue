<template>
    <button :class="'veb-'+ buttonStyle + '-button'" :type="type">
        <slot></slot>
    </button>
</template>

<script>
import Helper from '../helper.js'

export default {
    name: 'veb-button',
    props: {
        type: {
            default: 'button',
            type: String
        },
        buttonStyle: {
            default: 'color',
            type: String
        }
    },
    methods: {
        whichTransitionEvent () {
            let t
            const el = document.createElement('fakeelement')

            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t]
                }
            }
        },
        customFunction (event) {
            this.$el.removeEventListener(this.transitionEvent, this.customFunction)
            Helper.removeClass(this.$el, 'hover')
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$el.addEventListener('hover', () => {
                Helper.addClass(this.$el, 'hover')
                console.log('focus')
            })
            this.$el.addEventListener('blur', () => {
                Helper.removeClass(this.$el, 'hover')
            })

            this.transitionEvent = this.whichTransitionEvent()

            this.$el.addEventListener('click', () => {
                this.$emit('click')
                if (this.type === 'submit') {
                    this.$emit('submit')
                }
                Helper.addClass(this.$el, 'hover')
                const event = document.createEvent('Event')
                event.initEvent('mouseleave', true, true)
                this.$el.dispatchEvent(event)
                this.$el.blur()
                this.$el.addEventListener(this.transitionEvent, this.customFunction)
            })

            // $el.on('click', function () {
            //     var $this = $(this)
            //     $this.trigger('mouseleave')
            //     $this.blur()
            //     $this.addClass('hover')
            //     $this.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
            //         $this.removeClass('hover')
            //     })
            // })
        })
    }
}
</script>
