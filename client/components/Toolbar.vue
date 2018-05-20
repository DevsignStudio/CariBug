<template>
    <veb-toolbar class="background-primary elevation z2" style="z-index:100" v-elevation>
        <span style="display: inline-block">
            <veb-icon-button name="menu" class="color-white show-xs hidden-lg hidden-xlg" @click="enable"></veb-icon-button>  
            <veb-icon-button name="menu" class="color-white hidden-xs hidden-xd hidden-md hidden-sm show-lg show-xlg" @click="bigMenuClick"></veb-icon-button>  
        </span>
        <span class="font-title toolbar-title color-white font-normal">{{ internalTitle }}</span> 
        
        <div slot="right">
            <veb-icon-button v-if="showIcon" :name="iconName" @click="iconAction" class="color-white"></veb-icon-button>
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
        },
        bigMenuClick () {
            this.$emit('bigMenuClick', 'click')
        },
        showOrHideIcon () {
            if (this.$route.name === 'dashboard') {
                this.iconName = 'plus'
                this.iconAction = this.goToAddNewProject
                return
            }

            this.iconName = ''
        },
        goToAddNewProject () {
            return this.$router.push('/dashboard/project/new')
        }
    },
    data () {
        return {
            dataTitle: null,
            iconName: '',
            iconAction: null
        }
    },
    computed: {
        internalTitle () {
            return this.dataTitle || this.title
        },
        showIcon () {
            if (this.iconName) {
                return true
            }
            return false
        }
    },
    mounted () {
        this.showOrHideIcon()
        this.dataTitle = this.$meta().refresh().title
        this.$router.afterEach(() => {
            setTimeout(() => {
                this.dataTitle = this.$meta().refresh().title
            }, 500)
        })
    },
    watch: {
        '$route.name' (newVal) {
            this.showOrHideIcon()
        }
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

