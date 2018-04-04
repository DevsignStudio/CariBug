<template>
    <div style="overflow: hidden; height: 100vh;">
        <veb-scrollbar>
            <nuxt/>
        </veb-scrollbar>
    </div>
</template>

<script>

export default {
    data () {
        return {
            isFinishLoad: false
        }
    }
    // mounted () {
    //     this.$nextTick(() => {
    //         // this.$refs.loading.enable()
    //         console.log(this.$router)
    //         this.$router.beforeEach((to, from, next) => {
    //             this.$refs.loading.enable()
    //             console.log('hello')
    //             next()
    //         })
    //         this.$router.afterEach((to, from) => {
    //             this.isFinishLoad = false
    //             // waitUntilLoadAllData(() => {
    //             //     this.$refs.loading.disable()
    //             //     this.isFinishLoad = true
    //             // })
    //             setTimeout(() => {
    //                 this.$refs.loading.disable()
    //                 this.isFinishLoad = true
    //             }, 1000)
    //         })
    //     })
    // }
    // methods: {
    //     enableLoading() {
    //         this.$refs.loading.enable()
    //     },
    //     disableLoading() {
    //         this.$refs.loading.disable()
    //     },
    // },
}
</script>
