<template>
    <div>
        <veb-page-container>
            <div class="components-panel">
                <div class="components-panel-inner" style="width: 100%">
                    <div style="margin-bottom: 16px;">
                        <veb-progress value="20" :determinate="true"></veb-progress>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <veb-progress value="20" class="accent" :determinate="true"></veb-progress>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <veb-progress :determinate="false"></veb-progress>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <veb-progress class="accent" :determinate="false"></veb-progress>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{code.Progress1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import Code from '~/assets/code/progress.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Progress',
            code: Code
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
}
</script>



