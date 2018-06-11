<template>
    <div style="padding-top: 20px;">
        <nuxt-link to="/dashboard/" exact>
            <veb-nav-list><veb-icon name="home"></veb-icon> Dashboard</veb-nav-list>
        </nuxt-link>
        <nuxt-link to="/dashboard/project/new" exact>
            <veb-nav-list><veb-icon name="plus"></veb-icon> New Project</veb-nav-list>
        </nuxt-link>
        <!-- <veb-divider></veb-divider> -->
        <veb-nav-list :sublist="true">
            <veb-icon name="drawing"></veb-icon> Components
            <span slot="sublist">
                <nuxt-link to="/dashboard/components/avatar" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Avatar</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/button" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Button</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/cards" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Cards</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/checkbox" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Checkbox</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/confirmation" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Confirmation</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/chip" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Chip</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/icon" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Icon</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/icon-button" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Icon Button</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/chip" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> List (WIP)</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/menu" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Menu</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/snackbar" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Snackbar</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/radio" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Radio</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/reveal" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Reveal</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/progress" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Progress</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/slider" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Slider</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/switch" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Switch</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/table" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Tab (WIP)</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/table" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Table</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/textfield" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Textfield</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/toolbar" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Toolbar</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/components/tooltip" exact>
                    <veb-nav-list><veb-icon name="blur"></veb-icon> Tooltip</veb-nav-list>
                </nuxt-link>
            </span>
        </veb-nav-list>
        <veb-nav-list :sublist="true">
            <veb-icon name="chart-bubble"></veb-icon> Directives
            <span slot="sublist">
                <nuxt-link to="/dashboard/users/" exact>
                    <veb-nav-list><veb-icon name="chart-bubble"></veb-icon> Ripple (WIP)</veb-nav-list>
                </nuxt-link>
                <nuxt-link to="/dashboard/users/" exact>
                    <veb-nav-list><veb-icon name="chart-bubble"></veb-icon> Elevation (WIP)</veb-nav-list>
                </nuxt-link>
            </span>
        </veb-nav-list>
        <!-- <veb-divider></veb-divider> -->
        <veb-nav-list @click="signout"><veb-icon name="key"></veb-icon> Sign Out</veb-nav-list>
        
    </div>
</template>

<script>

export default {
    methods: {
        signout () {
            this.$cookies.remove('token', {
                path: '/'
            })
            this.$router.push('/')
        }
    }
}
</script>


