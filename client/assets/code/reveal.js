export const Reveal1 = `<template>
    <div>
        <div class="col-xs-fluid-24">
        <div class="button-center-container">
            <veb-button class="primary" @click="$refs.reveal1.enable()" v-ripple>Show Reveal</veb-button>
        </div>
        </div>

        <veb-reveal ref="reveal1">

        </veb-reveal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            test: 2,
        }
    }
}
</script>
`

export default  {
    Reveal1
}
