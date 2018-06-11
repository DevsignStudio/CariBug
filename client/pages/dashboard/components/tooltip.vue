<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Tooltip</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <div class="components-panel">
                <div class="row center-xs">
                    <div class="col-xs-fluid-24">
                        <div class="button-center-container">
                            <veb-tooltip text="menu">
                                <veb-icon trigger-tooltip name="menu" class="color-grey-600"></veb-icon>
                            </veb-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <highlight-code lang="html">{{Code.Tooltip1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import Code from '~/assets/code/tooltip.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Slider',
            test: 2,
            Code,
        }
    },
    methods: {
        showReveal () {
            let layout = Helper.getParentFromClass(this, 'veb-layout')
            layout.showReveal()
        }
    }
}
</script>
