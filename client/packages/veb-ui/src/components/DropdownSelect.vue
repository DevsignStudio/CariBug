<template>
    <div :class="elClass" v-ripple @click="activate">
        <veb-dropdown-menu ref="dropdown">
            <div class="veb-floating-placeholder" v-if="value !== '' && value !== undefined">{{label}}</div>
            <div trigger-menu  class="veb-menu-select-description">{{description}}</div>
            <veb-menu ref="menuContent">
                <slot></slot>
            </veb-menu>
        </veb-dropdown-menu>
        <select ref="select" @focus="focus" :name="name" :disabled="disabled">
            <option :value="value">{{value}}</option>
        </select>
        <veb-icon name="menu-down"></veb-icon>
    </div>
</template>

<script>
import Helper from '../helper'
import $ from 'jquery'
export default {
    props: {
        name: {
            default: '',
            type: String
        },
        value: {
            value: ''
        },
        disabled: {
            value: false,
            type: Boolean
        },
        label: String
    },
    data () {
        return {
            tempValue: '',
            text: null
        }
    },
    computed: {
        description () {
            if (this.value === '' || this.value === undefined) {
                return this.label
            }
            return this.text
        },
        elClass () {
            return {
                'veb-menu-select': true,
                'disabled': this.disabled
            }
        }
    },
    watch: {
        tempValue (newValue) {
            this.$emit('input', newValue)
        },
        value (newValue) {
            this.resetDropdown()
            this.$emit('valueChange')
        }
    },
    methods: {
        focus (e) {
            this.$refs.dropdown.click(e)
            this.activate()
        },
        activate () {
            this.changeMenuSize()
            const allOptions = this.$refs.menuContent.$children[0].$children
            this.index = typeof this.index === 'undefined' ? 0 : this.index
            allOptions.forEach((option, i) => {
                Helper.removeClass(option.$el, 'selected')
                if (Helper.hasClass(option.$el, 'active')) {
                    this.index = i
                }
            })
            Helper.addClass(this.getCurrentSelectedChild().$el, 'selected')

            setTimeout(() => {
                this.scrollIntoView()
            }, 200)
            if (!this.activated) {
                document.addEventListener('keydown', (event) => {
                    if (Helper.hasClass(this.$refs.menuContent.$el, 'show')) {
                        const key = event.key // "a", "1", "Shift", etc.
                        this.activated = true
                        if (key === 'ArrowDown') {
                            if ((this.index + 1) < this.$refs.menuContent.$children[0].$children.length) {
                                Helper.removeClass(this.getCurrentSelectedChild().$el, 'selected')
                                this.index++
                                Helper.addClass(this.getCurrentSelectedChild().$el, 'selected')
                                this.scrollIntoView()
                            }
                        } else if (key === 'ArrowUp') {
                            if ((this.index - 1) >= 0) {
                                Helper.removeClass(this.getCurrentSelectedChild().$el, 'selected')
                                this.index--
                                Helper.addClass(this.getCurrentSelectedChild().$el, 'selected')
                                this.scrollIntoView()
                            }
                        } else if (key === 'Enter') {
                            this.getCurrentSelectedChild().$el.click()
                        }
                    }
                })
            }
        },
        getCurrentSelectedChild () {
            return this.$refs.menuContent.$children[0].$children[this.index]
        },
        scrollIntoView () {
            // this.getCurrentSelectedChild().$el.scrollIntoView()
        },
        getAllOptions () {
            this.options = this.$children[0].$children[0].$children[0].$children
        },
        resetDropdown () {
            this.getAllOptions()
            let noMatch = true
            for (var i = 0; i < this.options.length; i++) {
                Helper.removeClass(this.options[i].$el, 'active')
                if (this.value === this.options[i].value) {
                    Helper.addClass(this.options[i].$el, 'active')
                    this.text = this.options[i].$el.innerHTML
                    noMatch = false
                }
            }
            if (noMatch) {
                this.text = null
            }
        },
        changeMenuSize () {
            console.log(this.$el.offsetWidth)
            this.$refs.menuContent.$el.style.width = this.$el.offsetWidth + 'px'
        }
    },
    mounted () {
        const self = this
        self.$nextTick(function () {
            self.resetDropdown()
            self.changeMenuSize()
            $(self.$el).resize(function () {
                self.changeMenuSize()
            })
        })
    }
}
</script>
