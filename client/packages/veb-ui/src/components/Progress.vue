<template>
    <div class="veb-progress">
        <div v-if="determinate" :class="barClass" :style="styleWidth"></div>
        <div v-else class="indeterminate"></div>
    </div>
</template>


<script>
export default {
    props: {
        determinate: {
            default: true,
            type: Boolean
        },
        value: Number
    },
    computed: {
        barClass () {
            return this.determinate ? 'determinate' : 'inderterminate'
        },
        styleWidth () {
            return `width: ${this.value}%`
        }
    }
}
</script>
