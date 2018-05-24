<template>
    <div>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner" style="width: 100%">
                    <div class="row center-xs">
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim" background="#304ffe"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim" class="background-accent"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar char="NZ" class="background-accent"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim" class="elevation z5" v-elevation background="#304ffe"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar class="background-primary">
                                <veb-icon name="plus"></veb-icon>
                            </veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar class="background-primary">
                                <img src="/team.jpg" class="img-responsive" alt="">
                            </veb-avatar>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{code.Avatar1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner" style="width: 100%">
                    <div class="row center-xs">
                        <div class="col-xs-1">
                            <veb-avatar class="small" text="Nizul Zaim"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar class="small" text="Nizul Zaim" background="#304ffe"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim" class="small background-accent"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar char="NZ" class="small background-accent"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar text="Nizul Zaim" class="small elevation z5" v-elevation background="#304ffe"></veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar class="small background-primary">
                                <veb-icon name="plus"></veb-icon>
                            </veb-avatar>
                        </div>
                        <div class="col-xs-1">
                            <veb-avatar class="small background-primary">
                                <img src="/team.jpg" class="img-responsive" alt="">
                            </veb-avatar>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{code.Avatar2}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import Code from '~/assets/code/avatar.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Avatar',
            code: Code
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
    methods: {
        test () {
            this.$confirmation.run({
                message: 'Some Gmail features have failed to load. If this problem persists, try reloading the page, or using the  version. Learn More.',
                confirmText: 'Try Again',
                showCancel: false
            }, 
            () => console.log('hello'), 
            () => console.log('cancel'))
        }
    }
}
</script>
