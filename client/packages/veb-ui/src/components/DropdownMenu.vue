<template>
    <span class="veb-menu">
        <slot></slot>
    </span>
</template>

<script>
import Helper from '../helper.js'
export default {
    mounted () {
        this.$nextTick(() => {
            this.root = this.$root.$el
            this.triggerElement = this.$el.querySelector('[trigger-menu]')
            this.childElement = this.$el.querySelector('.veb-menu-content')
            this.childElement = this.root.appendChild(this.childElement)

            console.log(this.triggerElement)
            this.reposition()

            // this.triggerElement.addEventListener('mousedown', (e) => {
            //     this.reposition()
            // })

            this.triggerElement.addEventListener('focus', (e) => {
                this.click(e)
            })

            this.triggerElement.addEventListener('click', (e) => {
                this.click(e)
            })
        })
    },
    destroyed () {
        this.childElement.remove()
    },
    methods: {
        click (e) {
            this.reposition()
            var matches = document.querySelectorAll('.veb-menu-content')
            matches.forEach(function (element) {
                Helper.removeClass(element, 'show')
            })
            setTimeout(() => {
                Helper.addClass(this.childElement, 'show')
            }, 100)

            let ancestor = Helper.findAncestor(this.$el, 'gm-scroll-view')
            if (!ancestor) {
                ancestor = Helper.findAncestor(this.$el, 'gm-scrollbar-container')
            }

            if (ancestor) {
                Helper.one(ancestor, 'scroll', (ev) => {
                    Helper.removeClass(this.childElement, 'show')
                })
            }

            e.stopPropagation()
            Helper.one(document, 'click', (ev) => {
                Helper.removeClass(this.childElement, 'show')
            })

            Helper.one(document, 'blur', (ev) => {
                Helper.removeClass(this.childElement, 'show')
            })
        },
        reposition () {
            const bodyRect = document.body.getBoundingClientRect()
            const elemRect = this.triggerElement.getBoundingClientRect()

            const offsetTop = elemRect.top - bodyRect.top
            const offsetLeft = elemRect.left - bodyRect.left
            const offsetRight = bodyRect.right - elemRect.right
            const offsetBottom = bodyRect.bottom - elemRect.bottom

            Helper.removeClass(this.childElement, 'left-top')
            Helper.removeClass(this.childElement, 'left-bottom')
            Helper.removeClass(this.childElement, 'right-top')
            Helper.removeClass(this.childElement, 'right-bottom')
            if (document.body.offsetWidth - offsetLeft > this.childElement.offsetWidth) {
                this.childElement.style.left = offsetLeft + 'px'
                this.childElement.style.right = 'auto'
                this.frontClass = 'left'
            } else {
                this.childElement.style.left = 'auto'
                this.childElement.style.right = offsetRight + 'px'
                this.frontClass = 'right'
            }

            if (offsetBottom - this.childElement.offsetHeight > 0) {
                this.childElement.style.top = offsetTop + 'px'
                this.childElement.style.bottom = 'auto'
                this.backClass = 'top'
            } else {
                this.childElement.style.top = 'auto'
                this.childElement.style.bottom = offsetBottom + 'px'
                this.backClass = 'bottom'
            }

            Helper.addClass(this.childElement, this.frontClass + '-' + this.backClass)
        }
    }
}
</script>
