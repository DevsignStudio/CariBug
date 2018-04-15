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
                            <veb-radio name="radioTest" val="radio1" v-model="radioData"></veb-radio>
                            <veb-radio name="radioTest" val="radio2" v-model="radioData" class="accent"></veb-radio>
                            <veb-radio name="radioTest" val="radio3" v-model="radioData" class="green"></veb-radio>
                            <veb-radio name="radioTest" val="radio4" v-model="radioData" class="red"></veb-radio>
                            <veb-radio name="radioTest" val="radio5" v-model="radioData" class="pink"></veb-radio>
                            <veb-radio name="radioTest" val="radio6" v-model="radioData" class="blue"></veb-radio>
                            <veb-radio name="radioTest" val="radio7" v-model="radioData" class="indigo"></veb-radio>
                            <veb-radio name="radioTest" val="radio8" v-model="radioData" class="teal"></veb-radio>
                            <veb-radio name="radioTest" val="radio9" v-model="radioData" class="amber"></veb-radio>
                            <veb-radio name="radioTest" val="radio10" v-model="radioData" class="orange"></veb-radio>
                            <veb-radio name="radioTest" val="radio11" v-model="radioData" class="deep-orange"></veb-radio>
                            <veb-radio name="radioTest" val="radio12" v-model="radioData" class="deep-purple"></veb-radio>
                            <veb-radio name="radioTest" val="radio13" v-model="radioData" class="light-blue"></veb-radio>
                            <veb-radio name="radioTest" val="radio14" v-model="radioData" class="cyan"></veb-radio>
                            <veb-radio name="radioTest" val="radio15" v-model="radioData" class="light-green"></veb-radio>
                            <veb-radio name="radioTest" val="radio16" v-model="radioData" class="lime"></veb-radio>
                            <veb-radio name="radioTest" val="radio17" v-model="radioData" class="yellow"></veb-radio>
                            <veb-radio name="radioTest" val="radio18" v-model="radioData" class="brown"></veb-radio>
                            <veb-radio name="radioTest" val="radio19" v-model="radioData" class="blue-grey"></veb-radio>
                            <veb-radio name="radioTest" val="radio20" v-model="radioData" disabled></veb-radio>
                        </div>
                    </div>
                </div>
                
            </div>
            <highlight-code lang="html">{{Radio1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Radio1} from '~/assets/code/radio.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Toolbar',
            Radio1,
            switchData: '',
            radioData: 'radio1'
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
