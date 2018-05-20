<template>
    <veb-reveal :enable-overlay-click="false" ref="reveal">
        <div class="row center-xs  middle-xs has-gutter" style="padding: 0px 8px;">
            <div class="col-xd-8">
                <veb-cards class="elevation z3">
                    <veb-cards-content class="scrollable" style="padding: 24px 24px">
                        <div class="font-headline font-medium" style="margin-bottom: 8px">{{title}}</div>
                        <div class="font-body no-margin dialog-message">
                            {{message}}
                        </div>
                    </veb-cards-content>
                    <veb-cards-action>
                        <div class="pull-right">
                            <veb-button v-if="showCancel" @click="cancel" button-style="flat" class="dialog-confirm-button" v-ripple>{{cancelText}}</veb-button>
                            <veb-button @click="confirm" class="dialog-cancel-button primary" v-ripple>{{confirmText}}</veb-button>
                        </div>
                    </veb-cards-action>
                </veb-cards>
            </div>
        </div>
    </veb-reveal>
</template>

<script>
import Button from './Button'
import CardContent from './CardsContent'
import CardAction from './CardsAction'
import Cards from './Cards'
import Reveal from './Reveal'
import ripple from '../directives/v-ripple'
export default {
    directives: {
        ripple,
    },
    mounted () {
        this.$refs.reveal.enable()
    },
    components: {
        'veb-button': Button,
        'veb-reveal': Reveal,
        'veb-cards': Cards,
        'veb-cards-content': CardContent,
        'veb-cards-action': CardAction
    },
    methods: {
        confirm() {
            this.$refs.reveal.disable()
            this.confirmed()
        },
        cancel() {
            this.$refs.reveal.disable()
            this.canceled()
        },
    }
}
</script>
