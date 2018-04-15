<template>
    <veb-menu-item @click="click" class="veb-menu-option">
        <slot></slot>
    </veb-menu-item>
</template>

<script>
export default {
    props: {
        value: [String, Number, Boolean]
    },
    methods: {
        click () {
            // console.log(this);
            this.$parent.$parent.$parent.$parent.tempValue = this.value
            this.$parent.$parent.$parent.$parent.text = this.$el.innerText
        }
    }
}
</script>