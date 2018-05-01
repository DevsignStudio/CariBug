<template>
    <div class="reveal">
        <div class="veb-reveal row no-gutter" ref="element">
            <div :class="{innerClass: true, 'veb-reveal-overlay': true, 'has-overlay': hideOverlay}" @click="overlayClick"></div>
            <slot></slot>
        </div>
    </div>
    
</template>

<script>
import Helper from '../helper.js'
export default {
    props: {
        enableOverlayClick: {
            default: true
        },
        value: {
            default: false
        },
        innerClass: {
            default: ''
        }
    },
    computed: {
        hideOverlay () {
            return this.value && !this.enableOverlayClick
        }
    },
    watch: {
        value (newVal) {
            this.toggle(newVal)
        }
    },
    methods: {
        toggle (value) {
            if (value) {
                this.enable()
            } else {
                this.disable()
            }
        },
        overlayClick() {
            if (!this.enableOverlayClick) {
                return
            }
            this.disable()
        },
        disable () {
            const el = this.$refs.element
            Helper.removeClass(el, 'enable')
            this.$emit('close')
            setTimeout(function () {
                if (!Helper.hasClass(el, 'enable')) {
                    Helper.removeClass(el, 'front')
                }
            }, 200)
            this.$emit('input', false)
        },
        enable () {
            const el = this.$refs.element
            Helper.addClass(el, 'front')
            setTimeout(function () {
                Helper.addClass(el, 'enable')
            }, 100)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.toggle(this.value)
            this.root = this.$root.$el
            const $el = this.$refs.element
            this.$el.elementNodes = $el
            this.childElement = this.root.appendChild($el)
        })
    },
    destroyed () {
        this.childElement.remove()
    }
}
</script>

<style lang="scss">
    .veb-reveal {
        .row {
            pointer-events: none;
            [class ^="col-"] {
                pointer-events: auto;
            }
        }
    }
</style>
