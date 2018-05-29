<template>
    <veb-toolbar class="background-primary elevation z2" style="z-index:100" v-elevation ref="mainToolbar">
        <span style="display: inline-block">
            <veb-icon-button name="menu" class="color-white show-xs hidden-lg hidden-xlg" @click="enable"></veb-icon-button>  
            <veb-icon-button name="menu" class="color-white hidden-xs hidden-xd hidden-md hidden-sm show-lg show-xlg" @click="bigMenuClick"></veb-icon-button>  
        </span>
        <span class="font-title toolbar-title color-white font-normal">{{ internalTitle }}</span> 
        
        <div slot="right">
            <veb-icon-button v-if="this.iconActionStore !== null" :name="iconName" @click="iconActionRun" class="color-white"></veb-icon-button>
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
        goToAddNewProject () {
            return this.$router.push('/dashboard/project/new')
        },
        iconActionRun () {
            this.iconActionStore()
        },
        registerIconAction({iconName},cb) {
            this.iconName = iconName
            this.iconActionStore = cb
        }
    },
    data () {
        return {
            dataTitle: null,
            iconName: '',
            iconActionStore: null
        }
    },
    computed: {
        internalTitle () {
            return this.dataTitle || this.title
        }
    },
    mounted () {
        this.dataTitle = this.$meta().refresh().title.replace('Caribug | ', '')
        this.$root.mainToolbar = this
        this.$router.afterEach(() => {
            this.iconActionStore = null
            setTimeout(() => {
                this.dataTitle = this.$meta().refresh().title.replace('Caribug | ', '')
            }, 500)
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

