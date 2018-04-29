<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Cards</h1>
            <p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>
            <div class="components-panel">
                <div class="row center-xs" style="width: 100%">
                    <div class="col-xs-fluid-24 col-xd-5">
                        <veb-cards>
                            <veb-cards-content class="has-big-padding">
                                <div class="font-subhead color-grey-600 font-margin">Word of the Day</div>
                                <div class="font-headline">be•nev•o•lent</div>
                                <div class="font-subhead color-grey-700 font-margin">adjective</div>
                                <div class="font-body">well meaning and kindly.<br>"a benevolent smile"</div> 
                            </veb-cards-content>
                            <veb-cards-action>
                                <div class="pull-right">
                                    <veb-button button-style="flat" v-ripple>Learn More</veb-button>
                                </div>
                            </veb-cards-action>
                        </veb-cards>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{cards1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="row center-xs" style="width: 100%">
                    <div class="col-xs-fluid-24 col-xd-6">
                        <veb-cards>
                            <veb-image src="/abd50bc0e11052fea9669f18f0c017bc.jpg" v-ripple/>
                            <veb-cards-content class="has-padding">
                                <div class="font-headline">Lizard</div>
                                <div class="font-body">Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica</div> 
                            </veb-cards-content>
                            <veb-divider></veb-divider>
                            <veb-cards-action>
                                <div class="pull-right">
                                    <veb-button button-style="flat" v-ripple>Learn More</veb-button>
                                    <veb-button button-style="flat" v-ripple class="primary">Share</veb-button>
                                </div>
                            </veb-cards-action>
                        </veb-cards>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{cards2}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
            <div class="components-panel">
                <div class="row center-xs" style="width: 100%">
                    <div class="col-xs-fluid-24 col-xd-7">
                        <veb-cards>
                            <div class="row has-gutter">
                                <div class="col-xs">
                                    <veb-cards-content class="has-padding row" style="flex-direction: column">
                                        <div class="col-xs">
                                            <div class="font-headline">Live From Space</div>
                                            <div class="font-subhead color-grey-600">Mac Miller</div>
                                        </div>
                                        <div class="button-center-container" style="height: 64px;">
                                            <veb-icon-button class="color-grey" name="skip-previous"></veb-icon-button>
                                            <veb-icon-button class="color-grey hover-scale" name="play"></veb-icon-button>
                                            <veb-icon-button class="color-grey" name="skip-next"></veb-icon-button>
                                        </div>
                                    </veb-cards-content>
                                </div>
                                <div class="col-xs-10 col-xd-3">
                                    <veb-image src="/10993a62b6858a778d88d72229d60d4b.jpg" :resolution="100" v-ripple/>
                                </div>
                            </div>
                        </veb-cards>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{cards3}}</highlight-code>
        </veb-page-container>
        
    </div>
</template>

<script>
import {Cards1, Cards2, Cards3} from '~/assets/code/cards.js'
import Helper from '~/packages/veb-ui/src/helper.js'
export default {
    data () {
        return {
            pageTitle: 'Components > Cards',
            cards1: Cards1,
            cards2: Cards2,
            cards3: Cards3
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
