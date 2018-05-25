<template>
    <div class="veb-menu-content">
        <div>
            <veb-scrollbar class="dont-count">
                <div>
                    <slot></slot>
                </div>
            </veb-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.$nextTick(() => {
            this.$el.addEventListener('click', (e) => {
                e.stopPropagation()
            })
        })
    }
}
</script>