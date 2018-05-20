<template>
    <div class="veb-chip" @click="clicked" @keyup.delete="removeWithKey" v-ripple>
        <slot name="avatar"></slot>
        <span class="veb-chip-text">
            {{name}}
        </span>
        <span  @click="remove">
            <veb-icon ref="closeElement" v-if="closeButton" name="close-circle" class="veb-chip-close"></veb-icon>
        </span>
        <input ref="hiddenInput" @focus="pressed" @blur="pressed" type="text" class="veb-chip-hidden-input">
    </div>
</template>

<script>
import Helper from '../helper'
export default {
    props: {
        name: String,
        value: [String, Number],
        closeButton: false
    },
    methods: {
        clicked (e) {
            if (!this.closeButton) {
                this.$refs.hiddenInput.focus()
            } else {
                if(e.target && e.target !== this.$refs.closeElement.$el) {
                    this.$refs.hiddenInput.focus()
                }
            }
        },
        pressed () {
            Helper.toggleClass(this.$el, 'pressed')
        },
        remove() {
            this.$emit('remove', this.value)
        },
        removeWithKey () {
            if(Helper.hasClass(this.$el, 'pressed')) {
                this.remove()
            }
        }
    }
}
</script>

