<template>
    <div class="swipe-tab-content" style="height: 100%">
        <veb-scrollbar ref="scrollbar">
            <slot></slot>
        </veb-scrollbar>
    </div>
</template>

<script>
export default {
    mounted () {
        // console.log(this.$refs.scrollbar.myScrollbar)
        //this.$refs.scrollbar.$el.myScrollbar.update()
    }
}
</script>

