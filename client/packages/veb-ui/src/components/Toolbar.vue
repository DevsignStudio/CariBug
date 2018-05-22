<template>
    <div :class="['veb-toolbar', classSelected]">
        <div class="row middle-xs no-gutter" style="min-height: 56px;">
            <div class="pull-left col-xs">
                <div>
                    <slot></slot>
                </div>
            </div>
            <div class="pull-right">
                <slot name="right"></slot>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        classAfter: String,
        classBefore: String
    },
    data () {
        return {
            classSelected: null
        }
    },
    mounted () {
        this.classSelected = this.classBefore
        this.$nextTick(() => {
            const nextElement = this.$el.nextElementSibling
            const scrollbar = this.findAncestor(this.$el, 'simplebar')

            setTimeout(() => {
                if (scrollbar && nextElement) {
                    // scrollbar.SimpleBar.getScrollElement().addEventListener('scroll', (e) => {
                    //     let nextHeight = nextElement.offsetHeight + this.offset(nextElement).top
                    //     if (nextHeight <= 0 + this.$el.offsetHeight) {
                    //         this.classSelected = this.classAfter
                    //     } else {
                    //         this.classSelected = this.classBefore
                    //     }
                    // })
                }
            }, 150)
        })
    },
    methods: {
        findAncestor (el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el
        },
        offset (elt) {
            const rect = elt.getBoundingClientRect()
            const bodyElt = document.body

            return {
                top: rect.top + bodyElt.scrollTop,
                left: rect.left + bodyElt.scrollLeft
            }
        }
    }
}
</script>
