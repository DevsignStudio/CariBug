<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Toolbar</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <!--<p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>-->
            <div class="components-panel">
                <div class="row center-xs">
                    <div class="col-xs-fluid-24">
                        <div>
                            <veb-switch name="switchTest" v-model="switchData"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="accent"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="green"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="red"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="pink"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="blue"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="indigo"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="teal"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="amber"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="orange"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="deep-orange"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="deep-purple"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="light-blue"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="cyan"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="light-green"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="lime"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="yellow"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="brown"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" class="blue-grey"></veb-switch>
                            <veb-switch name="switchTest" v-model="switchData" disabled></veb-switch>
                        </div>
                    </div>
                </div>
            </div>
            <highlight-code lang="html">{{Switch1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Switch1} from '~/assets/code/switch.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Toolbar',
            Switch1,
            switchData: ''
        }
    },
    head () {
        return {
            title: this.pageTitle
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
