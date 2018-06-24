<template>
    <div style="width: 100%; max-width: 100%; height: 100%; position: absolute; top: 0;left: 0; overflow: hidden"  class="flex-fill-height">
        <div class="flex-fill-height">
            <veb-tab id="tab" ref="tabHeader" class="background-primary elevation z2" v-elevation style="visibility: visible">
                <veb-tab-item v-ripple>To-do</veb-tab-item>
                <veb-tab-item v-ripple>Doing</veb-tab-item>
                <veb-tab-item v-ripple>Done</veb-tab-item>
                <veb-tab-item v-ripple>Verified</veb-tab-item>
                <veb-tab-item v-ripple>In Production</veb-tab-item>
            </veb-tab>
            <veb-tab-content ref="tabContent" element="#tab" :size="3"  class="flex-fill-height">
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <veb-cards class="cards-details" v-for="listitem in unassignedItems" :key="listitem._id">
                                    <div @click="toggleHeight" class="cards-toggler">
                                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px; cursor: pointer" v-ripple>
                                            <div class="font-title" style="text-overflow: ellipsis; height: 30px; overflow: hidden" >{{listitem.title}}</div>
                                        </veb-cards-content>
                                    </div>
                                    <div>
                                        <veb-divider></veb-divider>
                                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                                            <!-- <div class="font-subhead font-medium" style="margin-bottom: 20px;">{{listitem.title}}</div> -->
                                            <div class="font-body">{{listitem.description}}</div>
                                        </veb-cards-content>
                                        <!-- <veb-cards-content style="padding: 12px;">
                                            <veb-chip name="High Priority" class="invert background-red"></veb-chip>
                                            <veb-chip name="module:UAUC" class="invert background-primary"></veb-chip>
                                            <veb-chip name="module:HSERAI" class="invert background-primary"></veb-chip>
                                            <veb-chip name="module:Incident" class="invert background-primary"></veb-chip>
                                        </veb-cards-content> -->
                                        <veb-cards-action>
                                            <div class="pull-right">
                                                <span>
                                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                                </span>
                                                <veb-button v-for="handler in listitem.availableHandler" :key="handler.internalName" class="primary" v-ripple>{{handler.displayName}}</veb-button>
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
                <veb-tab-content-item>
                    fgfg
                </veb-tab-content-item>
            </veb-tab-content>
        </div>
        <veb-reveal ref="addItem">
            <div class="row center-xs  middle-xs">
                <div class="col-xs-fluid-24 col-xd-8">
                    <veb-cards>
                        <form @submit.prevent="insert">
                            <veb-cards-content style="padding: 24px; padding-bottom: 0;">
                                <div class="font-headline font-medium" style="margin-bottom: 16px">Add Item</div>
                                <veb-textfield v-model="input.title" placeholder="Title"></veb-textfield>
                                <veb-textfield v-model="input.description" type="multiline" placeholder="Description"></veb-textfield>
                            </veb-cards-content>
                            <veb-cards-action>
                                <div class="pull-right">
                                    <veb-button type="submit" class="primary" v-ripple><veb-icon name="plus"></veb-icon>Insert</veb-button>
                                </div>
                            </veb-cards-action>
                        </form>
                    </veb-cards>
                </div>
            </div>
        </veb-reveal>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import _ from 'lodash'
import Helper from '~/assets/helper'
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
import CurrentuserProjectsGQL from '~/apollo/query/currentUserProjects.gql'
import ProjectListItemGetAllGQL from '~/apollo/query/projectListItemGetAll.gql'
import CurrentProjectGQL from '~/apollo/query/currentProject.gql'
import CreateListItemGQL from '~/apollo/query/createListItem.gql'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Lists',
            selectValue: '',
            currentUser: null,
            currentUserProjects: [],
            projectListItemGetAll: [],
            input: {
                title: '',
                description: '',
            }
        }
    },
    computed: {
        unassignedItems () {
            return this.projectListItemGetAll.filter((item) => {
                return item.state === 'Created' || item.state === 'Assigned'
            }) 
        }
    },
    mounted () {
        this.$nextTick(() => [
            this.$root.mainToolbar.registerIconAction({iconName: 'plus'},() => {
                this.$refs.addItem.enable()
            })
        ])
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
            
        },
        insert() {
            this.$apollo.mutate({
                mutation: CreateListItemGQL,
                variables: {
                    title: this.input.title,
                    description: this.input.description,
                    projectListId: this.$route.params.id
                },
                refetchQueries: [{
                    query: ProjectListItemGetAllGQL,
                    variables: {
                        projectListId: this.$route.params.id
                    }
                }],
                // // Optimistic UI
                // // Will be treated as a 'fake' result as soon as the request is made
                // // so that the UI can react quickly and the user be happy
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     addTag: {
                //         __typename: 'Tag',
                //         id: -1,
                //         label: newTag
                //     }
                // }
            }).then((result) => {
                if (result.data && result.data.createListItem) {
                    this.input.title = ''
                    this.input.description = ''
                    this.$snackbar.run({message: 'Successfully added new item'})
                }
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to add new item', type: 'color-pink'})
            })
            this.$refs.addItem.disable()
        }
    },
    apollo: {
        projectListItemGetAll: {
            query: ProjectListItemGetAllGQL,
            variables () {
                return {
                    projectListId: this.$route.params.id
                }
            },
            fetchPolicy: 'cache-and-network'
        },
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


