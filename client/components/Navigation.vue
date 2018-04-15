<template>
    <div>
        <nuxt-link to="/dashboard/" exact>
            <veb-nav-list><veb-icon name="home"></veb-icon> Dashboard</veb-nav-list>
        </nuxt-link>
        <veb-divider></veb-divider>
        <veb-nav-list :sublist="true">
            <veb-icon name="drawing"></veb-icon> Components
            <span slot="sublist">
                <nuxt-link to="/dashboard/components/button" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Button</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/checkbox" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Checkbox</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/cards" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Cards</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/toolbar" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Toolbar</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/radio" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Radio</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/switch" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Switch</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/table" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Table</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/textfield" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Textfield</veb-nav-list>
                </nuxt-link>
            </span>
        </veb-nav-list>
        <veb-nav-list :sublist="true">
            <veb-icon name="chart-bubble"></veb-icon> Directives
            <span slot="sublist">
                <nuxt-link to="/dashboard/users/" exact>
                    <veb-nav-list><veb-icon name="chart-bubble"></veb-icon> Ripple</veb-nav-list>
                </nuxt-link>
            </span>
        </veb-nav-list>
        <veb-divider></veb-divider>
        <veb-nav-list @click="signout"><veb-icon name="key"></veb-icon> Sign Out</veb-nav-list>
        
    </div>
</template>

<script>
import store from 'store2'
export default {
    methods: {
        signout () {
            store('token', null)
            return this.$router.push('/')
        }
    }
}
</script>


