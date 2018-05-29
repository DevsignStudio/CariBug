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
                            <veb-checkbox name="checkboxTest" v-model="checkboxData"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxDataFalse" class="accent"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="green"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="red"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="pink"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="blue"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="indigo"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="teal"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="amber"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="orange"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="deep-orange"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="deep-purple"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="light-blue"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="cyan"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="light-green"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="lime"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="yellow"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="brown"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" class="blue-grey"></veb-checkbox>
                            <veb-checkbox name="checkboxTest" v-model="checkboxData" disabled></veb-checkbox>
                        </div>
                    </div>
                </div>
                
            </div>
            <highlight-code lang="html">{{Checkbox1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import {Checkbox1} from '~/assets/code/checkbox.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Toolbar',
            Checkbox1,
            checkboxData: true,
            checkboxDataFalse: false,
            switchData: '',
            radioData: ''
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
