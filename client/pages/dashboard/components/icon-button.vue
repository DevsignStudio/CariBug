<template>
    <div>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner" style="width: 100%">
                    <div class="row center-xs">
                        <div class="col-xs-1" >
                            <div style="margin: 0 auto">
                                <veb-tooltip :text="key">
                                    <veb-icon-button trigger-tooltip name="account"></veb-icon-button>
                                </veb-tooltip>
                            </div>
                        </div>
                        <div class="col-xs-1" >
                            <div style="margin: 0 auto">
                                <veb-tooltip :text="key">
                                    <veb-icon-button trigger-tooltip name="account" class="color-primary"></veb-icon-button>
                                </veb-tooltip>
                            </div>
                        </div>
                        <div class="col-xs-1" >
                            <div style="margin: 0 auto">
                                <veb-tooltip :text="key">
                                    <veb-icon-button trigger-tooltip name="account" class="color-accent"></veb-icon-button>
                                </veb-tooltip>
                            </div>
                        </div>
                        <div class="col-xs-1" >
                            <div style="margin: 0 auto">
                                <veb-tooltip :text="key">
                                    <veb-icon-button trigger-tooltip name="account" class="color-grey-600"></veb-icon-button>
                                </veb-tooltip>
                            </div>
                        </div>
                        <div class="col-xs-1" >
                            <div style="margin: 0 auto">
                                <veb-tooltip :text="key">
                                    <veb-icon-button trigger-tooltip name="account" class="disabled"></veb-icon-button>
                                </veb-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{code.IconButton1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import Code from '~/assets/code/icon-button.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Icon Button',
            code: Code
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    }
}
</script>



