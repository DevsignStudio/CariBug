<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Menu</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <div class="components-panel">
                <div class="row center-xs">
                    <div class="col-xs-fluid-24">
                        <div class="button-center-container">
                            <veb-dropdown-menu>
                                <veb-icon-button name="menu" trigger-menu></veb-icon-button>
                                <veb-menu>
                                    <veb-menu-item>Test 1</veb-menu-item>
                                    <veb-menu-item>Test 2</veb-menu-item>
                                    <veb-menu-item>Test 3</veb-menu-item>
                                    <veb-menu-item>Test 4</veb-menu-item>
                                </veb-menu>
                            </veb-dropdown-menu>
                        </div>
                    </div>
                </div>
            </div>
            <highlight-code lang="html">{{Code.Menu1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <h1 class="font-display1">Menu - Select</h1>
            <p>Toolbars appear a step above the content they affect. They may constrain their width to accommodate material passing over them. Do not separate a toolbar’s actions by another sheet of material, unless it is transient, such as a menu or dialog.</p>
            <div class="components-panel">
                <div class="row center-xs has-gutter">
                    <div class="col-xs-4">
                        <div>
                            <veb-select label="Please Select" v-model="test">
                                <veb-option value="1">Test 1</veb-option>
                                <veb-option value="2">Test 2</veb-option>
                                <veb-option value="3">Test 3</veb-option>
                                <veb-option value="4">Test 1</veb-option>
                                <veb-option value="5">Test 1</veb-option>
                                <veb-option value="6">Test 1</veb-option>
                                <veb-option value="7">Test 1</veb-option>
                                <veb-option value="8">Test 1</veb-option>
                                <veb-option value="9">Test 1</veb-option>
                                <veb-option value="10">Test 1</veb-option>
                                <veb-option value="11">Test 1</veb-option>
                            </veb-select>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div>
                            <veb-select label="Please Select" v-model="test" :disabled="true">
                                <veb-option value="1">Test 1</veb-option>
                                <veb-option value="2">Test 2</veb-option>
                                <veb-option value="3">Test 3</veb-option>
                                <veb-option value="4">Test 1</veb-option>
                                <veb-option value="5">Test 1</veb-option>
                                <veb-option value="6">Test 1</veb-option>
                                <veb-option value="7">Test 1</veb-option>
                                <veb-option value="8">Test 1</veb-option>
                                <veb-option value="9">Test 1</veb-option>
                                <veb-option value="10">Test 1</veb-option>
                                <veb-option value="11">Test 1</veb-option>
                            </veb-select>
                        </div>
                    </div>
                </div>
            </div>
            <highlight-code lang="html">{{Code.Menu2}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import Code from '~/assets/code/menu.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Components > Menu',
            test: '1',
            hello: '',
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
