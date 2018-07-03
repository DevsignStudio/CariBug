<template>
    <div style="width: 100%; max-width: 100%; height: 100%; position: absolute; top: 0;left: 0; overflow: hidden"  class="flex-fill-height">
        <div class="flex-fill-height">
            <veb-tab id="tab" ref="tabHeader" class="background-primary elevation z2" v-elevation>
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
                                <div class="loading-container" v-if="$apollo.loading">
                                    <div class="loading-style2"></div>
                                </div>
                                <list-item-cards :items="undoingItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <list-item-cards :items="doingItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                               <list-item-cards :items="doneItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                               <list-item-cards :items="verifiedItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <list-item-cards :items="inproductionItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
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
import StateActionListItemGQL from '~/apollo/query/stateActionListItem.gql'
import ListItemCards from '~/components/ListItemCards.vue'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    components: {
        ListItemCards
    },
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
        undoingItems () {
            return _.orderBy(this.projectListItemGetAll, ['insertedAt'], ['desc']).filter((item) => {
                return item.state === 'Created' || item.state === 'Assigned'
            }) 
        },
        doingItems () {
            return _.orderBy(this.projectListItemGetAll, ['insertedAt'], ['desc']).filter((item) => {
                return item.state === 'Doing'
            }) 
        },
        doneItems () {
            return _.orderBy(this.projectListItemGetAll, ['insertedAt'], ['desc']).filter((item) => {
                return item.state === 'Done'
            }) 
        },
        verifiedItems () {
            return _.orderBy(this.projectListItemGetAll, ['insertedAt'], ['desc']).filter((item) => {
                return item.state === 'Verified'
            }) 
        },
        inproductionItems () {
            return _.orderBy(this.projectListItemGetAll, ['insertedAt'], ['desc']).filter((item) => {
                return item.state === 'In Production'
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
        },
        action (handlerName, obj) {
            if (handlerName === 'assign') {
                obj.developerId = this.currentUser._id
            }
            let jsonObj = JSON.stringify(obj)

            this.$apollo.mutate({
                mutation: StateActionListItemGQL,
                variables: {
                    handlerName,
                    data: jsonObj
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
                if (result.data) {
                    this.$snackbar.run({message: 'Successfully added new item'})
                }
            }).catch((error) => {
                console.log(error)
                this.$snackbar.run({message: 'Failed to add new item', type: 'color-pink'})
            })
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
        currentUser: CurrentuserGQL
    }
}
</script>

