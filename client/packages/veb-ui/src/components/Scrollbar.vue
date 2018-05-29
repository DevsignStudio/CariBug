<template>
    <div class="gm-scrollbar-container" style="height: 100%">
        <div style="height: 100%" ref="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import GeminiScrollbar from 'gemini-scrollbar'
import Helper from '../helper'
export default {
    mounted () {
        this.$nextTick(() => {
            require('gemini-scrollbar/gemini-scrollbar.css')

            this.myScrollbar = new GeminiScrollbar({
                element: this.$el
            }).create()
            this.$el.style.height= this.$el.offsetHeight + 'px'
            let viewElement = this.myScrollbar.getViewElement()
            

            let updateZ =  () => {
                viewElement.style.zIndex = '0'
                let containerElement = viewElement.querySelectorAll('.gm-scrollbar-container:not(.dont-count)')
                if (containerElement.length > 0) {
                    viewElement.style.zIndex = '100'
                }
            }
            
            updateZ()
            
            setInterval(() => {
                this.myScrollbar.update()
            }, 500)

            this.$router.afterEach((to, from) => {
                setTimeout(() => {
                    this.myScrollbar.update()
                    updateZ()
                }, 700)
            })
        })
    },
    methods: {
        scrollTop () {
            this.myScrollbar.getViewElement().scrollTop = 0
        }
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
