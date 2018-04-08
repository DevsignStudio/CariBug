<template>
    <div>
        <veb-page-container style="overflow-x: hidden">
            <div class="wrapper" v-if="!$apollo.loading">
                <div class="row center-xs" style="margin-top: 64px;">
                    <div class="col-xs-fluid-24 col-md-fluid-9">
                        <img src="~/assets/img/welcome.svg" style="width: 50%;" alt="">
                        <div class="font-center font-headline" style="margin-bottom: 10px; margin-top: 16px">Here's where your work shines through</div>
                        <div class="font-center font-body">Set up a project to get going with your issues tracking. After that, you’ll find your relevant repositories and work right here.</div>
                        <div class="button-center-container" style="margin-top: 20px">
                            <nuxt-link to="/dashboard/project/new">
                                <veb-button class="primary" v-ripple><veb-icon name="plus"></veb-icon>Create project</veb-button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </veb-page-container>
    </div>
</template>

<script>
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
export default {
    data () {
        return {
            pageTitle: 'Dashboard',
            selectValue: '',
            currentUser: null
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
    apollo: {
        currentUser: CurrentuserGQL
    }
}
</script>

