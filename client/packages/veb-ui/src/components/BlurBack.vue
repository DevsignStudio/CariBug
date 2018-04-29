<template>
    <div class="veb-blur-back">
        <div class="veb-blur-back-background" :style="'background-image: url('+ background +')'" ref="background">
        </div>
        <div class="veb-blur-back-front">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        background: String
    }
}
</script>

<style lang="scss">
    .veb-blur-back-front {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }
</style>
