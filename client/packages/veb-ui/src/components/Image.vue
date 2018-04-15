<template>
    <div class="veb-image" :style="{paddingBottom, overflow: 'hidden'}">
        <img :src="src" >
    </div>
</template>

<script>
export default {
    name: 'veb-image',
    props: {
        resolution: {
            type: Number,
            default: 56.25
        },
        src: String
    },
    computed: {
        paddingBottom () {
            return this.resolution + '%'
        }
    }
}
</script>
