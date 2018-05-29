<template>
    <div style="width: 100%; max-width: 100%; height: 100%; position: absolute; top: 0;left: 0; overflow: hidden"  class="flex-fill-height">
        <div class="flex-fill-height">
            <veb-tab id="tab" ref="tabHeader" class="background-primary elevation z2" v-elevation style="visibility: visible">
                <veb-tab-item v-ripple>To-do</veb-tab-item>
                <veb-tab-item v-ripple>Done</veb-tab-item>
                <veb-tab-item v-ripple>Verified</veb-tab-item>
                <veb-tab-item v-ripple>In Production</veb-tab-item>
            </veb-tab>
            <veb-tab-content ref="tabContent" element="#tab" :size="4"  class="flex-fill-height">
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <veb-cards class="cards-details">
                                    <div @click="toggleHeight" class="cards-toggler">
                                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px; cursor: pointer" v-ripple>
                                            <div class="font-title">#1 Title 1</div>
                                        </veb-cards-content>
                                    </div>
                                    <div>
                                        <veb-divider></veb-divider>
                                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                                            <div class="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aut ut minus officia vitae quibusdam quidem dicta quae sint, eius hic libero dignissimos. Id vero iure explicabo eos corrupti. Nam.</div>
                                        </veb-cards-content>
                                        <veb-cards-content style="padding: 12px;">
                                            <veb-chip name="High Priority" class="invert background-red"></veb-chip>
                                            <veb-chip name="module:UAUC" class="invert background-primary"></veb-chip>
                                            <veb-chip name="module:HSERAI" class="invert background-primary"></veb-chip>
                                            <veb-chip name="module:Incident" class="invert background-primary"></veb-chip>
                                        </veb-cards-content>
                                        <veb-cards-action>
                                            <div class="pull-right">
                                                <span>
                                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                                </span>
                                                <veb-button class="primary" v-ripple><veb-icon name="check"></veb-icon>Done</veb-button>
                                            </div>
                                        </veb-cards-action>
                                    </div>
                                </veb-cards>
                                <veb-cards class="cards-details">
                                    <div @click="toggleHeight" class="cards-toggler">
                                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px; cursor: pointer" v-ripple>
                                            <div class="font-title">#1 Title 1</div>
                                        </veb-cards-content>
                                    </div>
                                    <div>
                                        <veb-divider></veb-divider>
                                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                                            <div class="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aut ut minus officia vitae quibusdam quidem dicta quae sint, eius hic libero dignissimos. Id vero iure explicabo eos corrupti. Nam.</div>
                                        </veb-cards-content>
                                        <veb-cards-action>
                                            <div class="pull-right">
                                                <span>
                                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                                </span>
                                                <veb-button class="primary" v-ripple><veb-icon name="check"></veb-icon>Done</veb-button>
                                            </div>
                                        </veb-cards-action>
                                    </div>
                                </veb-cards>
                                <veb-cards class="cards-details">
                                    <div @click="toggleHeight" class="cards-toggler">
                                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px; cursor: pointer" v-ripple>
                                            <div class="font-title">#1 Title 1</div>
                                        </veb-cards-content>
                                    </div>
                                    <div>
                                        <veb-divider></veb-divider>
                                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                                            <div class="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aut ut minus officia vitae quibusdam quidem dicta quae sint, eius hic libero dignissimos. Id vero iure explicabo eos corrupti. Nam.</div>
                                        </veb-cards-content>
                                        <veb-cards-action>
                                            <div class="pull-right">
                                                <span>
                                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                                </span>
                                                <veb-button class="primary" v-ripple><veb-icon name="check"></veb-icon>Done</veb-button>
                                            </div>
                                        </veb-cards-action>
                                    </div>
                                </veb-cards>
                                <veb-cards class="cards-details">
                                    <div @click="toggleHeight" class="cards-toggler">
                                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px; cursor: pointer" v-ripple>
                                            <div class="font-title">#1 Title 1</div>
                                        </veb-cards-content>
                                    </div>
                                    <div>
                                        <veb-divider></veb-divider>
                                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                                            <div class="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aut ut minus officia vitae quibusdam quidem dicta quae sint, eius hic libero dignissimos. Id vero iure explicabo eos corrupti. Nam.</div>
                                        </veb-cards-content>
                                        <veb-cards-action>
                                            <div class="pull-right">
                                                <span>
                                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                                </span>
                                                <veb-button class="primary" v-ripple><veb-icon name="check"></veb-icon>Done</veb-button>
                                            </div>
                                        </veb-cards-action>
                                    </div>
                                </veb-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item>
                    fgfg
                </veb-tab-content-item>
                <veb-tab-content-item>
                    fgfg
                </veb-tab-content-item>
                <veb-tab-content-item>
                    fgfg
                </veb-tab-content-item>
            </veb-tab-content>
        </div>
        
        <!-- <div class="wrapper">
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
                                <tr class="no-hover" v-if="$apollo.loading">
                                    <td colspan="100">
                                        <div class="loading-container table" >
                                            <div class="loading-style2"></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </veb-datatable>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
import _ from 'lodash'
import CurrentuserProjectsGQL from '~/apollo/query/currentUserProjects.gql'
import CurrentProjectGQL from '~/apollo/query/currentProject.gql'
import Helper from '~/assets/helper'
export default {
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Dashboard',
            selectValue: '',
            currentUser: null,
            currentUserProjects: []
        }
    },
    head () {
        return {
            title: this.pageTitle
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
        },
        toggleHeight(e) {
            let cards = Helper.findAncestor(e.target, 'veb-cards')
            Helper.toggleClass(cards, 'show')
            if (Helper.hasClass(cards, 'show')){
                cards.style.maxHeight = (cards.children[1].scrollHeight + 48) + 'px'
            } else {
                cards.style.maxHeight = 48 + 'px'
            }
            
        }
    },
    apollo: {
        currentUser: CurrentuserGQL,
        currentUserProjects: CurrentuserProjectsGQL
    }
}
</script>

<style scoped>
    .no-hover:hover {
        background: none;
    }

    .cards-details {
        will-change: max-height;
        transition: max-height 0.2s ease-in-out;
        transform: translateZ(0);
        overflow: hidden;
        max-height: 48px;
    }

    .cards-details .cards-toggler {
        z-index: 3;
    }

    .cards-details.show {
        height: auto;
    }

    .cards-details.show .cards-toggler {
        background: #fafafa;
    }
</style>


