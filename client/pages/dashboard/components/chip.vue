<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Chip</h1>
            <p>Chips represent complex entities in small blocks, such as a contact.</p>
            <p>A chip may contain entities such as a photo, text, rules, an icon, or a contact. Contact chips may represent contact information in a compact way.</p>
            <!--<p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>-->
            <div class="components-panel">
                <div class="row center-xs">
                    <div class="col-xs-fluid-24">
                        <div>
                            <veb-chip :name="chip.name" v-model="chip._id"></veb-chip>
                            <veb-chip :close-button="true" :name="chip.name" v-model="chip._id"></veb-chip>
                            <veb-chip class="background-primary invert" :close-button="true" :name="chip.name" v-model="chip._id"></veb-chip>
                            <veb-chip class="background-accent invert" :close-button="true" :name="chip.name" v-model="chip._id"></veb-chip>
                            <veb-chip :name="chip.name" v-model="chip._id">
                                <veb-avatar slot="avatar" text="Nizul Zaim"></veb-avatar>
                            </veb-chip>
                            <veb-chip @remove="remove" :name="chip.name" :close-button="true" v-model="chip._id">
                                <veb-avatar slot="avatar" text="Nizul Zaim"></veb-avatar>
                            </veb-chip>
                        </div>
                    </div>
                </div>
            </div>
            <highlight-code lang="html">{{Checkbox1}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Checkbox1} from '~/assets/code/checkbox.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Chip',
            Checkbox1,
            checkboxData: true,
            checkboxDataFalse: false,
            switchData: '',
            radioData: '',
            chip: {
                name: 'Nizul Zaim',
                _id: 1
            }
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
        },
        remove (val) {
            console.log(val)
        }
    }
}
</script>
