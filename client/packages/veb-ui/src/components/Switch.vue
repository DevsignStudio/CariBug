<template>
    <div class="veb-switch" @click="elOnClick()">
        <input ref="checkbox" :checked="value" @click="thumbOnClick" @change="$emit('input', $event.target.checked)" type="checkbox" :disabled="disabled" :name="name" >
        <div class="veb-switch-track"></div>
        <div ref="ripple" class="veb-switch-ripple"></div>
        <div class="veb-switch-thumb"></div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
        value: {

        },
        disabled: {
            default: false
        },
        name: {
            default: ''
        }
    },
    methods: {
        elOnClick () {
            $(this.$refs.checkbox).trigger('click')
        },
        thumbOnClick (el) {
            var $el = $(this.$refs.ripple)
            $el.addClass('active')
            this.$emit('click')
            $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (event) {
                $el.removeClass('active')
            })
        }
    },
    mounted () {
        // const self = this
        // const el = this.$el
        // const $el = $(this.$el)
    }
}
</script>