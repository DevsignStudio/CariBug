export const Confirmation1 = `<template>
    <veb-button @click="confirm1" button-style="raised" class="primary" v-ripple v-elevation>Surprise 1</veb-button>
    <veb-button @click="confirm2" button-style="raised" class="primary" v-ripple v-elevation>Surprise 2</veb-button>
</template>

<script>
export default {
    methods: {
        confirm1 (){
            this.$confirmation.run({
                message: "Hello world"
            }, () => {
                this.$snackbar.run({
                    message: 'Confirm click'
                })
            }, () => {
                this.$snackbar.run({
                    message: 'Cancel click'
                })
            })
        },
        confirm2 () {
            this.$confirmation.run({
                message: 'Some Gmail features have failed to load.....',
                confirmText: 'Try Again',
                showCancel: false
            }, () => {
                this.$snackbar.run({
                    message: 'Confirm click'
                })
            })
        }
    }
}
</script>
`

export default  {
    Confirmation1
}
