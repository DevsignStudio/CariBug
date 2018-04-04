<template>
    <div>
        <navigation-small ref="navigation"></navigation-small>
        <div class="row no-gutter">
            <div class="col-md-5 hidden-xs hidden-xd hidden-md hidden-sm display-lg display-xlg" style="z-index: 4">
                <navigation-big></navigation-big>
            </div>
            <div class="col-xs" style="height: 100vh">
                <toolbar :title="title" @menuClick="menuClick"></toolbar>
                <veb-scrollbar>
                    <nuxt-child></nuxt-child>
                </veb-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
    import store from 'store2'
    import Toolbar from '~/components/Toolbar'
    import NavigationBig from '~/components/NavigationBig'
    import NavigationSmall from '~/components/NavigationSmall'
    export default {
        data () {
            return {
                title: 'Dashboard'
            }
        },
        methods: {
            menuClick () {
                this.$refs.navigation.$children[0].enable()
            }
        },
        components: {
            Toolbar,
            NavigationBig,
            NavigationSmall
        },
        created () {
            if (!store('token')) {
                return this.$router.push('/')
            }
        }
    }
</script>

<style>
    .container-small {
        max-width: 700px;
    }
</style>
