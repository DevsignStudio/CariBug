<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Toolbar</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <!--<p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>-->
            <div class="components-panel">
                <veb-toolbar class="background-primary elevation z2" v-elevation>
                    <div class="font-title color-white">Title</div>
                </veb-toolbar>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{toolbar1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <veb-toolbar class="background-accent elevation z2" v-elevation>
                    <veb-icon-button name="menu" class="color-white"></veb-icon-button>
                    <div class="font-title color-white" style="display: inline-block; margin: 0; margin-left: 20px;">Title</div>
                    <span slot="right" class="veb-dark-theme">
                        <veb-button button-style="color" class="inverse" v-ripple>Button</veb-button>
                        <veb-icon-button name="dots-vertical" class="color-white"></veb-icon-button>
                    </span>
                </veb-toolbar>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{toolbar2}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import {Toolbar1, Toolbar2} from '~/assets/code/toolbar.js'
import Helper from '~/assets/helper'

export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Toolbar',
            toolbar1: Toolbar1,
            toolbar2: Toolbar2
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
