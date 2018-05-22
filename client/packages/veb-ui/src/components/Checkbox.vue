<template>
    <div class="veb-checkbox" @click="elOnClick()">
        <input ref="checkbox" :checked="value" @click="thumbOnClick" @change="$emit('input', $event.target.checked)" type="checkbox" :disabled="disabled" :name="name">
        <div ref="ripple" class="veb-checkbox-ripple"></div>
        <veb-icon :name="uncheckIcon" class="veb-checkbox-uncheck"></veb-icon>
        <veb-icon :name="checkIcon" class="veb-checkbox-check"></veb-icon>
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
        },
        checkIcon: {
            default: 'checkbox-marked'
        },
        uncheckIcon: {
            default: 'checkbox-blank-outline'
        }
    },
    watch: {
        value (val) {
            // console.log(val)
        }
    },
    methods: {
        elOnClick () {
            $(this.$refs.checkbox).trigger('click')
        },
        thumbOnClick (el) {
            var $el = $(this.$refs.ripple)
            this.$emit('click')
            $el.addClass('active')
            $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (event) {
                $el.removeClass('active')
            })
        }
    }
}
</script>
