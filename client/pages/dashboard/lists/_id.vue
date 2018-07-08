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
                                
                                <div v-if="assignedItems && assignedItems.length" class="font-subhead font-medium color-grey-600" style="margin-bottom: 16px;">Assigned Items</div>
                                <list-item-cards @editClicked="updateRecord" v-if="assignedItems && assignedItems.length" :items="assignedItems"></list-item-cards>
                                <div v-if="undoingItems && undoingItems.length" class="font-subhead font-medium color-grey-600" style="margin-bottom: 16px;">Unassigned Items</div>
                                <list-item-cards @editClicked="updateRecord" v-if="undoingItems && undoingItems.length" :items="undoingItems"></list-item-cards>

                                <div v-if="!$apollo.loading && !assignedItems.length && !undoingItems.length">
                                    <fade-transition>
                                        <div class="row center-xs" style="margin-top: 64px;">
                                            <div class="col-xs-fluid-24 col-md-fluid-18" >
                                                <img src="~/assets/img/notes.svg" style="width: 50%;" alt="">
                                                <div class="font-center font-headline" style="margin-bottom: 10px; margin-top: 16px">Here's where your work shines through</div>
                                                <div class="font-center font-body">Set up a project to get going with your issues tracking. After that, you’ll find your relevant repositories and work right here.</div>
                                                <div class="button-center-container" style="margin-top: 20px">
                                                    <veb-button @click="showAddItem" class="primary" button-style="raised" v-ripple v-elevation><veb-icon name="plus"></veb-icon>Add New Item</veb-button>
                                                    <!-- <veb-button v-else @click="showAddItem" class="primary" button-style="raised" v-ripple v-elevation><veb-icon name="plus"></veb-icon>Update Item</veb-button> -->
                                                    <!-- <veb-button @click="showUserList" class="primary" button-style="flat" v-ripple v-elevation><veb-icon name="settings"></veb-icon>Settings</veb-button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </fade-transition>
                                </div>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <list-item-cards @editClicked="updateRecord" :items="doingItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                               <list-item-cards @editClicked="updateRecord" :items="doneItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                               <list-item-cards @editClicked="updateRecord" :items="verifiedItems"></list-item-cards>
                            </div>
                        </div>
                    </veb-page-container>
                </veb-tab-content-item>
                <veb-tab-content-item >
                    <veb-page-container style="max-width: 500px;">
                        <div class="row center-xs">
                            <div class="col-xs-fluid-24">
                                <list-item-cards @editClicked="updateRecord" :items="inproductionItems"></list-item-cards>
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
                        <form @submit.prevent="submit">
                            <veb-cards-content style="padding: 24px; padding-bottom: 0;">
                                <div class="font-headline font-medium" style="margin-bottom: 16px" v-if="!selectedRecordId">Add Item</div>
                                <div class="font-headline font-medium" style="margin-bottom: 16px" v-if="selectedRecordId">Update Item</div>
                                <veb-textfield v-model="input.title" placeholder="Title"></veb-textfield>
                                <veb-textfield v-model="input.description" type="multiline" placeholder="Description"></veb-textfield>
                                <veb-select label="Priority" v-model="input.priority">
                                    <veb-option v-for="p in getProjectListItemPriority" :key="p._id" :value="p._id">{{p.name}}</veb-option>
                                </veb-select>
                            </veb-cards-content>
                            <veb-cards-action>
                                <div class="pull-right">
                                    <veb-button @click="disableAddItem" button-style="flat" class="primary" v-ripple>Cancel</veb-button>
                                    <veb-button v-if="!selectedRecordId" type="submit" class="primary" v-ripple><veb-icon name="plus"></veb-icon>Create</veb-button>
                                    <veb-button v-else type="submit" class="primary" v-ripple><veb-icon name="pencil"></veb-icon>Update</veb-button>
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
import getProjectListItemPriorityGQL from '~/apollo/query/getProjectListItemPriority.gql'
import CurrentProjectGQL from '~/apollo/query/currentProject.gql'
import CreateListItemGQL from '~/apollo/query/createListItem.gql'
import UpdateListItemGQL from '~/apollo/query/updateListItem.gql'
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
                priority: '',
            },
            selectedRecordId: null,
            getProjectListItemPriority: []
        }
    },
    computed: {
        undoingItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'Created'
            }) 
        },
        assignedItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'Assigned'
            }) 
        },
        doingItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'Doing'
            }) 
        },
        doneItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'Done'
            }) 
        },
        verifiedItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'Verified'
            }) 
        },
        inproductionItems () {
            return _.orderBy(this.projectListItemGetAll, ['Priority.order','insertedAt'], ['desc', 'asc']).filter((item) => {
                return item.state === 'In Production'
            }) 
        }
    },
    mounted () {
        this.$nextTick(() => [
            this.$root.mainToolbar.registerIconAction({iconName: 'plus'},() => {
                this.showAddItem()
            })
        ])
    },
    methods: {
        showAddItem(itemDetails = null) {
            this.selectedRecordId = null
            if (itemDetails !== null) {
                this.input.title = itemDetails.title
                this.input.description = itemDetails.description
                this.input.priority = itemDetails.Priority._id
                this.selectedRecordId = itemDetails._id
            }
            this.$refs.addItem.enable()
        },
        disableAddItem() {
            this.$refs.addItem.disable()
        },
        updateRecord(listItem) {
            this.showAddItem(listItem)
        },
        orderData (header, order) {
            if (header === 'Last Update') {
                header = 'updatedAt'
            } else if (header === 'Name') {
                header = 'name'
            }
            this.currentUserProjects = _.orderBy(this.currentUserProjects, header, order)
        },
        submit () {
            if (this.selectedRecordId) {
                return this.update()
            }

            return this.insert()
        },
        insert() {
            this.$apollo.mutate({
                mutation: CreateListItemGQL,
                variables: {
                    title: this.input.title,
                    description: this.input.description,
                    projectListId: this.$route.params.id,
                    priorityId: this.input.priority
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
                    this.input.priority = ''
                    this.$snackbar.run({message: 'Successfully added new item'})
                }
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to add new item', type: 'color-pink'})
            })
            this.$refs.addItem.disable()
        },
        update () {
            this.$apollo.mutate({
                mutation: UpdateListItemGQL,
                variables: {
                    title: this.input.title,
                    description: this.input.description,
                    projectListItemId: this.selectedRecordId,
                    priorityId: this.input.priority
                },
                refetchQueries: [{
                    query: ProjectListItemGetAllGQL,
                    variables: {
                        projectListId: this.$route.params.id
                    }
                }],
            }).then((result) => {
                if (result.data && result.data.updateListItem) {
                    this.input.title = ''
                    this.input.description = ''
                    this.input.priority = ''
                    this.$snackbar.run({message: 'Successfully update item'})
                }
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to update item', type: 'color-pink'})
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
        getProjectListItemPriority: getProjectListItemPriorityGQL,
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

