<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Textfield</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <!--<p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>-->
            <div class="components-panel">
                <div class="row center-xs has-gutter" >
                    <div class="col-xs-fluid-24 has-gutter col-md-6">
                        <veb-textfield v-model="testData" placeholder="Name"></veb-textfield>
                        <veb-textfield v-model="testData" placeholder="Name" message="Message here"></veb-textfield>
                        <veb-textfield v-model="testData" placeholder="Name" message="Message here" :force-message="true"></veb-textfield>
                        <veb-textfield v-model="testData" placeholder="Multiline" type="multiline"></veb-textfield>
                        <veb-textfield v-model="testData" class="accent" placeholder="Name"></veb-textfield>
                        <veb-textfield v-model="testData" type="password" placeholder="Password"></veb-textfield>
                        <veb-textfield v-model="testDataWithValue" class="accent" placeholder="Name" :disabled="true"></veb-textfield>
                        <veb-textfield v-model="testDataWithValue" class="accent" placeholder="Name" :is-info="true"></veb-textfield>
                        <veb-textfield v-model="testDataWithValue" placeholder="Name" class="success" message="Message here" :force-message="true" :always-show-color="true"></veb-textfield>
                        <veb-textfield v-model="testDataWithValue" placeholder="Name" class="failed" message="Message here" :force-message="true" :always-show-color="true"></veb-textfield>
                        
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{Textfield1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Textfield1} from '~/assets/code/textfield.js'
import Helper from '~/assets/helper'
export default {
    data () {
        return {
            pageTitle: 'Components > Textfield',
            Textfield1,
            testData: '',
            testDataWithValue: 'Example Value'
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
