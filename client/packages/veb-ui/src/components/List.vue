<template> 
    <div :class="elClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        dense: {
            default: true,
            type: Boolean
        }
    },
    computed: {
        elClass () {
            return {
                'veb-list': true,
                'not-auto-dense': !this.dense
            }
        }
    }
}
</script>