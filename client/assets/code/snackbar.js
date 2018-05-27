export const Snackbar1 = `<template>
    <veb-button @click="confirm1" button-style="raised" class="primary" v-ripple v-elevation>Surprise 1</veb-button>
    <veb-button @click="confirm2" button-style="raised" class="primary" v-ripple v-elevation>Surprise 2</veb-button>
</template>

<script>
export default {
    methods: {
        confirm1 (){
            this.$snackbar.run({
                message: "Hello world"
            })
        },
        confirm2 () {
            this.$snackbar.run({
                message: 'Some Gmail features have failed to load....',
                type: 'color-pink',
                buttonText: 'Try Again'
            }, () => {
                this.$snackbar.run({
                    message: 'Done'
                })
            })
        }
    }
}
</script>
`

export default  {
    Snackbar1
}
