<template>
    <div class="veb-snackbar" @mouseover="clear" @mouseout="startBack" >
        <div class="row middle-xs">
            <div class="col-xs">
                <div class="text-content">{{message}}</div>
            </div>
            <div style="margin-left: auto;">
                <veb-button @click="stop" :class="type" button-style="flat" v-ripple>{{buttonText}}</veb-button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button'
import ripple from '../directives/v-ripple'
import Helper from '../helper'
export default {
    components: {
        'veb-button': Button
    },
    directives: {
        ripple
    },
    methods: {
        stop () {
            clearTimeout(this.timeout)
            this.removeFunction()
        },
        clear() {
            clearTimeout(this.timeout)
        },
        startBack() {
            this.timeout = window.setTimeout(() => {
                this.removeFunction()
            }, 5000);
        }
    },
    mounted () {
        window.setTimeout(() => {
            Helper.addClass(this.$el, 'show')
            this.removeFunction = () => {
                Helper.removeClass(this.$el, 'show')
                var whichTransitionEvent = function () {
                    var el = document.createElement('fakeelement');
                    var transitions = {
                        'transition': 'transitionend',
                        'OTransition': 'oTransitionEnd',
                        'MozTransition': 'transitionend',
                        'WebkitTransition': 'webkitTransitionEnd'
                    }

                    for (var t in transitions) {
                        if (el.style[t] !== undefined) {
                            return transitions[t];
                        }
                    }
                }
                let transition = whichTransitionEvent()
                Helper.one(this.$el, transition, () => {
                    this.finished()
                })
            }
            this.timeout = window.setTimeout(() => {
                this.removeFunction()
            }, 5000);

        }, 200)
    }
}
</script>

