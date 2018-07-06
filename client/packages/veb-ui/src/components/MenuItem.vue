<template>
    <div class="veb-menu-item" @click="click"><slot></slot></div>
</template>

<script>
import Helper from '../helper.js'
export default {
    methods: {
        click () {
            const ancestor = Helper.findAncestor(this.$el, 'veb-menu-content')
            Helper.removeClass(ancestor, 'show')
            const itemActive = ancestor.querySelector('.veb-menu-item.active')
            if (itemActive && itemActive !== this.$el) {
                Helper.removeClass(itemActive, 'active')
            }
            this.$emit('click')
        }
    },
    mounted () {
        const self = this
        self.$nextTick(() => {
        })
    }
}
</script>
