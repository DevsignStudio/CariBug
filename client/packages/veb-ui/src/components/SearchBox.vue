<template>
    <form class="veb-search-box" @submit.prevent="search">
        <input type="text" ref="input" placeholder="Search" @focus="enable" @blur="disable" @keyup="enable" @click="enable" :value="value" >
        <veb-icon-button name="magnify" class="visible-xs visible-xd pull-right" @click="enable" v-ripple></veb-icon-button>
        <veb-icon-button ref="toggler" :name="buttonIcon" class="search-button pull-right" @mousedown="buttonToggler" @mouseup="mouseUp" v-ripple></veb-icon-button>
        <veb-icon-button name="arrow-left" class="close-button visible-xs visible-xd" @click="disable" v-ripple></veb-icon-button>
    </form>
</template>

<script>

import Helper from '../helper.js'
export default {
    props: {
        value: {}
    },
    data () {
        return {
            buttonIcon: 'magnify',
            disableDisable: false
        }
    },
    methods: {
        enable () {
            Helper.addClass(this.$el, 'enable')
            this.$el.focus()
            this.buttonIcon = 'close'
        },
        disable () {
            if (!this.disableDisable) {
                Helper.removeClass(this.$el, 'enable')
                this.$emit('input', this.$refs.input.value)
                if (this.$refs.input.value === '') {
                    this.buttonIcon = 'magnify'
                }
            }
        },
        search () {
            Helper.addClass(this.$el, 'enable')
            this.$refs.input.blur()
            this.$emit('submit')
        },
        buttonToggler () {
            Helper.addClass(this.$el, 'enable')
            if (this.$refs.input.value !== '') {
                this.$refs.input.value = ''
                this.$emit('input', this.$refs.input.value)
            }
            this.disableDisable = true
        },
        mouseUp () {
            setTimeout(() => {
                this.disableDisable = false
                this.$refs.input.focus()
            }, 200)
        },
        clearText () {
            this.$refs.input.value = ''
            this.$emit('input', this.$refs.input.value)
        }
    },
    mounted () {
        // const $ = require('jquery')
        // const $el = $(this.$el)
        // $("*").bind("scroll.searchbox", function() {
        //     $el.removeClass("enable");
        //     $(self.$refs.input).blur();
        // })
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
                e.preventDefault()
                if (Helper.hasClass(this.$el, 'enable')) {
                    this.disable()
                    this.$refs.input.blur()
                } else {
                    this.enable()
                }
            }
        })
    }
}
</script>