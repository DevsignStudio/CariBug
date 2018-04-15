<template>
    <veb-cards :class="elClass">
        <veb-scrollbar>
            <div>
                <slot></slot>
            </div>
        </veb-scrollbar>
    </veb-cards>
</template>
<script>
// import ScrollBar from './ScrollBar.vue';
import Helper from '../helper'
import Sugar from 'sugar'
export default {
    props: {
        sortable: Boolean
    },
    computed: {
        elClass () {
            return {
                'veb-cards-table': true,
                'sortable': this.sortable,
                'unsortable': !this.sortable
            }
        }
    },
    mounted () {
        var self = this
        self.$nextTick(() => {
            Sugar.extend()
            const $headers = this.$el.querySelectorAll('th:not(.unsortable)')
            for (let i = 0; i < $headers.length; i++) {
                var icon = document.createElement('i')
                Helper.addClass(icon, 'mdi')
                Helper.addClass(icon, 'mdi-arrow-down')
                Helper.addClass(icon, 'sort-icon')
                $headers[i].appendChild(icon)
                $headers[i].addEventListener('click', function () {
                    if (self.$activeHeader) {
                        if (self.$activeHeader === $headers[i]) {
                            Helper.toggleClass(self.$activeHeader, 'desc')
                            self.order = self.order === 'desc' ? 'asc' : 'desc'
                        } else {
                            Helper.removeClass(self.$activeHeader, 'desc')
                            Helper.removeClass(self.$activeHeader, 'active')
                            self.order = 'asc'
                        }
                    } else {
                        self.order = 'asc'
                    }
                    Helper.addClass($headers[i], 'active')
                    self.$activeHeader = $headers[i]
                    self.$emit('headerClick', self.$activeHeader.innerText, self.order)
                })
            }
        })
    }
}
</script>