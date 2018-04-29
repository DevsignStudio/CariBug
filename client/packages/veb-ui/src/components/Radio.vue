<template>
    <div class="veb-radio" @click="elOnClick()">
        <input ref="radio" :checked="value === val" @click="thumbOnClick" @change="$emit('input', val)" type="radio" :disabled="disabled" :name="name" :value="val">
        <div ref="ripple" class="veb-radio-ripple"></div>
        <veb-icon :name="uncheckIcon" class="veb-radio-uncheck"></veb-icon>
        <veb-icon :name="checkIcon" class="veb-radio-check"></veb-icon>
    </div>
</template>
<script>
import Icon from './Icon.vue'
import $ from 'jquery'
export default {
    components: {
        Icon
    },
    props: {
        value: {

        },
        val: {
            default: ''
        },
        disabled: {
            default: false
        },
        name: {
            default: ''
        },
        checkIcon: {
            default: 'radiobox-marked'
        },
        uncheckIcon: {
            default: 'radiobox-blank'
        }
    },
    methods: {
        elOnClick () {
            $(this.$refs.radio).trigger('click')
        },
        thumbOnClick (el) {
            var $el = $(this.$refs.ripple)
            $el.addClass('active')
            this.$emit('click')
            $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (event) => {
                $el.removeClass('active')
            })
        }
    }
}
</script>