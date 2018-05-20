<template>
    <div :class="elClass" style="min-height: 56px">
        <textarea style="min-height: 31px" :class="{'always-show': alwaysShowColor}" v-if="isMultiline" :autocomplete="autocomplete" :autocorrect="autocorrect" :autocapitalize="autocapitalize" :spellcheck="spellcheck" :disabled="disabled || isInfo" @blur="blur" @focus="focusInput" ref="textarea" @input="updateValue($event.target.value)" v-model="textareaData"></textarea>
        <input :class="{'always-show': alwaysShowColor}" v-if="!isMultiline" :disabled="disabled || isInfo" ref="input" :type="type" :autocomplete="autocomplete" :autocorrect="autocorrect" :autocapitalize="autocapitalize" :spellcheck="spellcheck" :value="value" @blur="blur" @focus="focusInput" @input="updateValue($event.target.value)">
        <div class="veb-textfield-floating-placeholder" @click="focusInput">{{placeholder}}</div>
        <div class="veb-textfield-line"></div>
        <div :class="messageClass">{{message}}</div>
    </div>
</template>

<script>
import Helper from '../helper.js'
import autosize from 'autosize'
export default {
    props: {
        type: {
            default: 'text'
        },
        value: {},
        placeholder: {
            default: ''
        },
        message: {
            default: ''
        },
        forceMessage: {
            default: false,
            type: Boolean
        },
        disabled: {
            default: false,
            type: Boolean
        },
        isInfo: {
            default: false,
            type: Boolean
        },
        autocomplete: {
            default: '',
            type: String
        },
        autocorrect: {
            default: '',
            type: String
        },
        autocapitalize: {
            default: '',
            type: String
        },
        spellcheck: {
            default: '',
            type: String
        },
        selectAll: {
            default: false,
            type: Boolean
        },
        alwaysShowColor: {
            default: false,
            type: Boolean
        }
    },
    computed: {
        messageClass () {
            return {
                'veb-textfield-message': true,
                'force-message': this.forceMessage,
            }
        },
        elClass () {
            return {
                'veb-textfield': true,
                'is-info': this.isInfo,
                'multiline': this.isMultiline,
                'disabled': this.disabled
            }
        },
        isMultiline () {
            if (this.type === 'multiline') {
                return true
            }
            return false
        },
        textareaData: {
            get () {
                return this.value
            },
            set (newValue) {
                this.updateValue(newValue)
            }
        }
    },
    mounted () {
        this.checkIfHasValue()
        this.$nextTick(() => {
            if (this.isMultiline) {
                autosize(this.$refs.textarea)
            }
        })
    },
    watch: {
        value (val) {
            this.checkIfHasValue()
        }
    },
    methods: {
        updateValue (val) {
            this.checkIfHasValue()
            this.$emit('input', val)
            this.$emit('change')
        },
        checkIfHasValue () {
            var $el = this.$refs.input

            if (this.isMultiline) {
                $el = this.$refs.textarea
            }
            if (this.value === '') {
                Helper.removeClass($el, 'has-text')
            } else {
                Helper.addClass($el, 'has-text')
            }
        },
        focusInput () {
            var $el = this.$refs.input

            if (this.isMultiline) {
                $el = this.$refs.textarea
            }

            $el.focus()
            Helper.addClass(this.$el, 'on-focus')
            if (this.selectAll) {
                $el.select()
            }
        },
        blur () {
            var $el = this.type ===  'multiline' ? this.$refs.textarea : this.$refs.input
            Helper.removeClass(this.$el, 'on-focus')
            $el.blur()
        }
    }
}
</script>
