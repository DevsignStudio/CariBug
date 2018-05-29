<template>
    <div>
        <veb-page-container style="overflow-x: hidden">
            <div class="wrapper">
                <div class="row center-xs" style="margin-top: 64px;">
                    <div class="col-xs-fluid-24 col-md-fluid-9" >
                        <img src="~/assets/img/welcome.svg" style="width: 50%;" alt="">
                        <div class="font-center font-headline" style="margin-bottom: 10px; margin-top: 16px">Here's where your work shines through</div>
                        <div class="font-center font-body">Set up a project to get going with your issues tracking. After that, you’ll find your relevant repositories and work right here.</div>
                        <div>
                            <veb-slider v-model="test"></veb-slider>
                            {{test}}
                        </div>
                        <div class="button-center-container" style="margin-top: 20px">
                            <nuxt-link to="/dashboard/project/new">
                                <veb-button class="primary" v-ripple><veb-icon name="plus"></veb-icon>New project</veb-button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row center-xs" >
                    <div class="col-xs-fluid-24 col-md-fluid-15" >
                        <div class="font-display1" style="margin-bottom: 10px; margin-top: 16px">Projects</div>
                        <veb-datatable @headerClick="orderData" :sortable="true">
                            <table style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="unsortable">#</th>
                                        <th>Name</th>
                                        <th>Owner</th>
                                        <th>Last Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="no-hover" style="height: 4px; margin: 0; padding: 0;"  v-if="$apollo.loading">
                                        <td colspan="100" style="padding: 0">
                                            <veb-progress :determinate="false"></veb-progress>
                                        </td>
                                    </tr>
                                    <tr v-for="(project, key) in currentUserProjects" :key="project._id">
                                        <td>{{++key}}</td>
                                        <td>
                                            <veb-tooltip text="View Details">
                                                <nuxt-link trigger-tooltip :to="`/dashboard/project/${project._id}`">{{project.name}}</nuxt-link>
                                            </veb-tooltip>
                                        </td>
                                        <td>{{project.owner.username}}</td>
                                        <td>{{ project.updatedAt | moment("from", "now")}}</td>
                                    </tr>
                                    <tr class="no-hover" v-if="!currentUserProjects.length && !$apollo.loading">
                                        <td colspan="100">
                                            <div class="font-center">No Data</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </veb-datatable>
                    </div>
                </div>
            </div>
        </veb-page-container>
    </div>
</template>

<script>
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
import _ from 'lodash'
import CurrentuserProjectsGQL from '~/apollo/query/currentUserProjects.gql'
import CurrentProjectGQL from '~/apollo/query/currentProject.gql'
import { setTimeout } from 'timers';
import pageMixins from '~/mixins/pageMixins.js'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            selectValue: '',
            currentUser: null,
            pageTitle: 'Dashboard',
            currentUserProjects: [],
            test: 10
        }
    },
    methods: {
        orderData (header, order) {
            if (header === 'Last Update') {
                header = 'updatedAt'
            } else if (header === 'Name') {
                header = 'name'
            }
            this.currentUserProjects = _.orderBy(this.currentUserProjects, header, order)
        }
    },
    apollo: {
        currentUser: CurrentuserGQL,
        currentUserProjects: {
            query: CurrentuserProjectsGQL,
            fetchPolicy: 'cache-and-network'
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                this.test = 20
            }, 5000)

            this.$root.mainToolbar.registerIconAction({iconName: 'plus'},() => {
                this.$router.push('/dashboard/project/new')
            })
        })
    }
}
</script>

<style scoped>
    .no-hover:hover {
        background: none;
    }
</style>


