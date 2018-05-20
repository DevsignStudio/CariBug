<template>
    <div class="veb-slider">

    </div>
</template>

<script>
import * as noUiSlider from 'nouislider'
export default {
    props: {
        value: {
            default: 0,
            type: [Number, String],
        },
        min: {
            default: 0,
            type: Number,
        },
        max: {
            default: 100,
            type: Number,
        }
    },
    data () {
        return {
            currentValue: this.value
        }
    },
    computed : {
        val () {
            return this.value
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.slider =noUiSlider.create(this.$el, {
                start: this.value,
                connect: [true, false],
                tooltips: true,
                step: 1,
                range: {
                    'min': this.min,
                    'max': this.max
                }
            })
            this.slider.on('update', () => {
                this.currentValue = this.slider.get()
                this.$emit('input', this.currentValue)
            });
        })
    },
    watch: {
        val (newVal) {
            if (this.currentValue !== newVal) {
                this.slider.set(this.value)
            }
        }
    }
}
</script>
