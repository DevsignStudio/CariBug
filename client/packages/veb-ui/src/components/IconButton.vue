<template>
    <button class="veb-icon-button" @click="click">
        <div class="veb-icon-button-inner" @click="click">
            <veb-icon @click="$emit('click')" :name="name"></veb-icon>
        </div>
        <div class="veb-icon-button-ripple" ref="ripple"></div>
    </button>
</template>

<script>
import VebIcon from './Icon.vue'
import Helper from '../helper.js'

export default {
    props: {
        name: String
    },
    components: {
        VebIcon
    },
    methods: {
        click () {
            this.$emit('click')
            this.$emit('mouseup')
            this.$emit('mousedown')
            Helper.addClass(this.$refs.ripple, 'active')
            setTimeout(() => {
                Helper.removeClass(this.$refs.ripple, 'active')
            }, 650)
        }
    },
    mounted () {
        this.$nextTick(() => {
            const color = window.getComputedStyle(this.$el).getPropertyValue('color')
            this.$refs.ripple.style.backgroundColor = color
        })
    }
}
</script>
