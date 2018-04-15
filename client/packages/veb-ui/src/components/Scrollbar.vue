<template>
    <div class="gm-scrollbar-container" style="height: 100%">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import GeminiScrollbar from 'gemini-scrollbar'
export default {
    mounted () {
        this.$nextTick(() => {
            require('gemini-scrollbar/gemini-scrollbar.css')

            this.myScrollbar = new GeminiScrollbar({
                element: this.$el
            }).create()

            // window.onNuxtReady(() => {
            //     setTimeout(() => {
            //         this.myScrollbar.update()
            //     }, 300)
            //     console.log('hello')
                
            // })

            this.$router.afterEach((to, from) => {
                setTimeout(() => {
                    this.myScrollbar.update()
                }, 300)
            })
        })
    }
}
</script>

<style lang="scss">

    .gm-scrollbar-container {
        padding-bottom: 17px;

        &.gm-prevented {
            overflow: auto !important;
            padding-bottom: 0;
        }
    }

    .gm-scroll-view {
        max-width: calc(100% + 17px) !important;
        width: calc(100% + 17px)!important;
        height: calc(100% + 34px) !important;
        margin-bottom: -32px;
    }

    .gm-scrollbar.-horizontal{
    }

</style>
