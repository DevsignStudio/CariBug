<template>
    <div>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner" style="width: 100%">
                    <div class="row center-xs">
                        <div class="col-xs-2"  style="height: 48px;">
                            <div class="button-center-container">
                                <veb-button @click="confirm1" button-style="raised" class="primary" v-ripple v-elevation>Surprise 1</veb-button>
                                <veb-button @click="confirm2" button-style="raised" class="primary" v-ripple v-elevation>Surprise 2</veb-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{code.Confirmation1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import Code from '~/assets/code/confirmation.js'
export default {
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Confirmation',
            code: Code
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
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
                message: 'Some Gmail features have failed to load. If this problem persists, try reloading the page, or using the  version. Learn More.',
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



