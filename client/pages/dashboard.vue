<template>
    <div>
        <navigation-small ref="navigation"></navigation-small>
        <div class="row no-gutter">
            <div class="col-md-5 hidden-xs hidden-xd hidden-md hidden-sm display-lg display-xlg big-menu" style="z-index: 4" ref="bigMenu">
                <navigation-big></navigation-big>
            </div>
            <div class="col-xs" style="height: 100vh">
                <toolbar :title="title" @menuClick="menuClick" @bigMenuClick="hiddenBig"></toolbar>
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
import Helper from '~/assets/helper'
export default {
    data () {
        return {
            title: 'Dashboard'
        }
    },
    methods: {
        menuClick () {
            this.$refs.navigation.$children[0].enable()
        },
        hiddenBig () {
            if(Helper.hasClass(this.$refs.bigMenu, 'col-md-0')) {
                Helper.removeClass(this.$refs.bigMenu, 'col-md-0')
            } else {
                Helper.addClass(this.$refs.bigMenu, 'col-md-0')
            }
        }
    },
    components: {
        Toolbar,
        NavigationBig,
        NavigationSmall
    },
    created () {
        if (!this.$cookies.get('token')) {
            return this.$router.push('/')
        }
    }
}
</script>

<style>
    .container-small {
        max-width: 700px;
    }

    .big-menu {
        will-change: max-width;
        transition: all 0.2s linear;
        transform: translateZ(0)
    }
</style>
