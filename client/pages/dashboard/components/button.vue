<template>
    <div>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner">
                    <veb-button @click="test" button-style="flat">Button</veb-button>
                    <veb-button button-style="flat" v-ripple>Button</veb-button>
                    <veb-button button-style="flat" class="primary" v-ripple>Button</veb-button>
                    <veb-button button-style="flat" class="accent" v-ripple>Button</veb-button>
                    <veb-button button-style="flat" class="color-green" v-ripple>Button</veb-button>
                    <veb-button button-style="flat" disabled>Button</veb-button>
                </div>
            </div>
            <div class="veb-dark-theme">
                <div class="components-panel">
                    <div class="components-panel-inner">
                        <veb-button button-style="flat">Button</veb-button>
                        <veb-button button-style="flat" v-ripple>Button</veb-button>
                        <veb-button button-style="flat" class="primary" v-ripple>Button</veb-button>
                        <veb-button button-style="flat" class="accent" v-ripple>Button</veb-button>
                        <veb-button button-style="flat" class="color-green" v-ripple>Button</veb-button>
                        <veb-button button-style="flat" disabled>Button</veb-button>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{button1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner">
                    <veb-button button-style="raised">Button</veb-button>
                    <veb-button button-style="raised" v-ripple>Button</veb-button>
                    <veb-button button-style="raised" class="primary" v-elevation v-ripple>Button</veb-button>
                    <veb-button button-style="raised" class="accent" v-elevation v-ripple>Button</veb-button>
                    <veb-button button-style="raised" class="primary-gradient" v-ripple>Button</veb-button>
                    <veb-button button-style="raised" class="accent-gradient" v-ripple>Button</veb-button>
                    <veb-button button-style="raised" class="color-white background-green" v-ripple>Button</veb-button>
                    <veb-button button-style="raised" disabled>Button</veb-button>
                </div>
            </div>
            <div class="veb-dark-theme">
                <div class="components-panel">
                    <div class="components-panel-inner">
                        <veb-button button-style="raised">Button</veb-button>
                        <veb-button button-style="raised" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" v-elevation class="primary" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" class="accent" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" class="primary-gradient" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" class="accent-gradient" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" class="color-white background-green" v-ripple>Button</veb-button>
                        <veb-button button-style="raised" disabled>Button</veb-button>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{button2}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner">
                    <veb-button>Button</veb-button>
                    <veb-button v-ripple>Button</veb-button>
                    <veb-button class="primary" v-ripple>Button</veb-button>
                    <veb-button class="accent" v-ripple>Button</veb-button>
                    <veb-button class="primary-gradient" v-ripple>Button</veb-button>
                    <veb-button class="accent-gradient" v-ripple>Button</veb-button>
                    <veb-button class="color-white background-green" v-ripple>Button</veb-button>
                    <veb-button disabled>Button</veb-button>
                </div>
            </div>
            <div class="veb-dark-theme">
                <div class="components-panel">
                    <div class="components-panel-inner">
                        <veb-button>Button</veb-button>
                        <veb-button v-ripple>Button</veb-button>
                        <veb-button class="primary" v-ripple>Button</veb-button>
                        <veb-button class="accent" v-ripple>Button</veb-button>
                        <veb-button class="primary-gradient" v-ripple>Button</veb-button>
                        <veb-button class="accent-gradient" v-ripple>Button</veb-button>
                        <veb-button class="color-white background-green" v-ripple>Button</veb-button>
                        <veb-button disabled>Button</veb-button>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{button3}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner">
                    <veb-button @click="test" button-style="outline">Button</veb-button>
                    <veb-button button-style="outline" v-ripple>Button</veb-button>
                    <veb-button button-style="outline" class="primary" v-ripple>Button</veb-button>
                    <veb-button button-style="outline" class="accent" v-ripple>Button</veb-button>
                    <veb-button button-style="outline" disabled>Button</veb-button>
                </div>
            </div>
            <div class="veb-dark-theme">
                <div class="components-panel">
                    <div class="components-panel-inner">
                        <veb-button button-style="outline">Button</veb-button>
                        <veb-button button-style="outline" v-ripple>Button</veb-button>
                        <veb-button button-style="outline" class="primary" v-ripple>Button</veb-button>
                        <veb-button button-style="outline" class="accent" v-ripple>Button</veb-button>
                        <veb-button button-style="outline" disabled>Button</veb-button>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{button1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Button1, Button2, Button3} from '~/assets/code/button.js'
export default {
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Button',
            button1: Button1,
            button2: Button2,
            button3: Button3
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
