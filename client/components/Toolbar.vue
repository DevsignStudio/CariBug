<template>
    <veb-toolbar class="background-primary elevation z2" style="z-index:100" v-elevation>
        <span style="display: inline-block">
            <veb-icon-button name="menu" class="color-white show-xs hidden-lg hidden-xlg" @click="enable"></veb-icon-button>  
        </span>
        <span class="font-title toolbar-title color-white font-normal">{{ internalTitle }}</span> 
        
        <div slot="right">
            <veb-icon-button name="dots-vertical" class="color-white"></veb-icon-button>
        </div>
    </veb-toolbar>
</template>

<script>
export default {
    props: {
        title: String
    },
    methods: {
        enable () {
            this.$emit('menuClick', 'click')
        }
    },
    data () {
        return {
            dataTitle: null
        }
    },
    computed: {
        internalTitle () {
            return this.dataTitle || this.title
        }
    },
    mounted () {
        this.dataTitle = this.$meta().refresh().title
        this.$router.afterEach(() => {
            setTimeout(() => {
                this.dataTitle = this.$meta().refresh().title
            }, 100)
        })
    }
}
</script>

<style>
    .toolbar-title {
        margin-left: 10px;
    }

    .background-custom {
        background: linear-gradient(90deg, #2196F3 0%, #7739FA 100%);
    }
</style>

