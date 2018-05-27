<template>
    <div>
        <veb-page-container style="overflow-x: hidden">
            <div class="wrapper">
                <div>
                    <fade-transition>
                        <div class="row center-xs" style="margin-top: 64px;">
                            <div class="col-xs-fluid-24 col-md-fluid-9" >
                                <img src="~/assets/img/notes.svg" style="width: 50%;" alt="">
                                <div class="font-center font-headline" style="margin-bottom: 10px; margin-top: 16px">Here's where your work shines through</div>
                                <div class="font-center font-body">Set up a project to get going with your issues tracking. After that, you’ll find your relevant repositories and work right here.</div>
                                <div class="button-center-container" style="margin-top: 20px">
                                    <veb-button @click="showAdd" class="primary" button-style="raised" v-ripple v-elevation><veb-icon name="plus"></veb-icon>Create New List</veb-button>
                                    <veb-button @click="showUserList" class="primary" button-style="flat" v-ripple v-elevation><veb-icon name="settings"></veb-icon>Settings</veb-button>
                                </div>
                            </div>
                        </div>
                    </fade-transition>
                    
                    <div class="clearfix"></div>
                    
                        <div class="row center-xs" v-if="currentProject && currentProject.lists.length">
                            <div class="col-xs-fluid-24 col-md-fluid-15">
                                <div class="font-display1" style="margin-bottom: 10px; margin-top: 16px">Lists</div>
                                <div class="row has-gutter">
                                    <div class="col-xs-fluid-8" v-for="list in currentProject.lists" :key="list._id">
                                        <slide-y-down-transition>
                                            <nuxt-link :to="`/dashboard/lists/${list._id}`" class="cards">
                                                <veb-cards style="border-left: 2px solid #3d5afe " >
                                                    <veb-cards-content style="padding: 24px 12px">
                                                        <div class="font-caption color-grey-600">List Name</div>
                                                        <div class="font-title color-grey-800">{{list.name}}</div>
                                                        <div class="font-caption color-grey-600" style="margin-top: 20px">Last Updated</div>
                                                        <div class="font-subhead font-normal color-grey-800">{{ list.updatedAt | moment("from", "now")}}</div>
                                                    </veb-cards-content>
                                                    <!-- <veb-cards-action class="background-grey-50">
                                                        <div class="pull-right">
                                                            <veb-button button-style="flat" v-ripple><veb-icon name="plus"></veb-icon>Create List</veb-button>
                                                        </div>
                                                    </veb-cards-action> -->
                                                </veb-cards>
                                            </nuxt-link>
                                        </slide-y-down-transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    
                    <div class="loading-container" v-if="(currentProjectNumberOfList && $apollo.loading) || (currentProjectNumberOfList === null && $apollo.loading)">
                        <div class="loading-style2"></div>
                    </div>
                </div>
            </div>
            <veb-reveal ref="addList">
                <div class="row center-xs  middle-xs">
                    <div class="col-xs-fluid-24 col-xd-6">
                        <veb-cards>
                            <form @submit.prevent="addList">
                                <veb-cards-content style="padding: 24px; padding-bottom: 0;">
                                    <div class="font-headline font-medium" style="margin-bottom: 8px">Add New List</div>
                                    <veb-textfield v-model="name" placeholder="List Name"></veb-textfield>
                                </veb-cards-content>
                                <veb-cards-action>
                                    <div class="pull-right">
                                        <veb-button type="submit" class="primary" v-ripple><veb-icon name="plus"></veb-icon>Create List</veb-button>
                                    </div>
                                </veb-cards-action>
                            </form>
                        </veb-cards>
                    </div>
                </div>
            </veb-reveal>
            <veb-reveal ref="showUserList">
                <veb-navigation class="right" style="width: 420px" v-if="currentProject">
                    <veb-tab id="tab" ref="tabHeader" class="background-primary elevation z2" style="visibility: visible">
                        <veb-tab-item v-ripple>Teams</veb-tab-item>
                        <veb-tab-item v-ripple>Settings</veb-tab-item>
                    </veb-tab>
                    <veb-tab-content ref="tabContent" element="#tab" :size="2" class="background-white">
                        <veb-tab-content-item >
                            <veb-list class="hover">
                                <veb-list-item  v-for="c in currentProject.teams" :key="c._id" @click="selectUser(c)"  style="cursor: pointer;height: 60px" v-ripple>
                                    <span slot="left">
                                        <veb-avatar :text="c.user.username" class="small"></veb-avatar>
                                    </span>
                                    <span>
                                        {{c.user.username}} 
                                        <span class="list-caption"  v-if="!c.user.isConfirmed">Pending Confirmation</span>  
                                    </span>
                                </veb-list-item>
                                <veb-divider></veb-divider>
                                <veb-list-item class="color-grey-600" style="cursor: pointer" @click="showAddUser" v-ripple>
                                    <span class="left">
                                        <veb-avatar class="background-primary elevation z3 small" v-elevation>
                                            <veb-icon name="plus"></veb-icon>
                                        </veb-avatar>
                                    </span>
                                    Add User
                                </veb-list-item>
                            </veb-list>
                        </veb-tab-content-item>
                        <veb-tab-content-item>
                            <div style="padding: 24px 12px" v-if="currentProject">
                                <veb-textfield v-model="currentProjectEditable.name" placeholder="Project Name"></veb-textfield>
                                <veb-textfield type="multiline" v-model="currentProjectEditable.description" placeholder="Project Description"></veb-textfield>
                            </div>
                        </veb-tab-content-item>
                    </veb-tab-content>
                </veb-navigation>
            </veb-reveal>
            <veb-reveal ref="showRoleSelection">
                <div class="row center-xs middle-xs">
                    <div class="col-xs-fluid-24 col-xd-6">
                        <veb-cards>
                            <form @submit.prevent="addUserAndRole">
                                <veb-cards-content style="padding: 24px; padding-bottom: 0">
                                    <div class="font-headline font-medium" style="margin-bottom: 8px">Assign Role</div>
                                    <veb-list ref="list" class="list" v-if="selectedRole && selectedRole.length" style="margin-left: -8px; margin-right: -8px;">
                                        <div v-for="(role, index) in getAllRoles" :key="role._id"> 
                                            <veb-list-item style="cursor: pointer;" @click="selectedRole[index].state = !selectedRole[index].state"  v-ripple>
                                                <span slot="left">
                                                    <veb-checkbox v-model="selectedRole[index].state" name="selectedRole"></veb-checkbox>
                                                </span>
                                                <span>
                                                    {{role.name}}
                                                </span>
                                            </veb-list-item>
                                            <veb-divider></veb-divider>
                                        </div>
                                    </veb-list>
                                </veb-cards-content>
                                <veb-cards-action>
                                    <div class="pull-right">
                                        <veb-button type="submit" class="primary" v-ripple><veb-icon name="plus"></veb-icon>Assign</veb-button>
                                    </div>
                                </veb-cards-action>
                            </form>
                        </veb-cards>
                    </div>
                </div>
            </veb-reveal>
            <people-picker ref="showAddUser" v-model="username" @getUser="getUser" :exclude="currentProjectUserId"></people-picker>
        </veb-page-container>
    </div>
</template>

<script>
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
import _ from 'lodash'
import CurrentuserProjectsGQL from '~/apollo/query/currentUserProjects.gql'
import CurrentProjectGQL from '~/apollo/query/currentProject.gql'
import CreateListGQL from '~/apollo/query/createList.gql'
import GetAllRolesGQL from '~/apollo/query/getAllRoles.gql'
import PeoplePicker from '~/components/PeoplePicker.vue'
import addUserAndRolesGQL from '~/apollo/query/addUserAndRoles.gql'
export default {
    components: {
        PeoplePicker
    },
    data () {
        return {
            pageTitle: 'Project Details',
            selectValue: '',
            currentUser: null,
            currentUserProjects: [],
            currentProject: null,
            name: '',
            username: '',
            selectedUser: null,
            selectedRole: [],
            getAllRoles: [],
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
    computed: {
        currentProjectEditable () {
            return {name: this.currentProject.name, description: this.currentProject.description}
        },
        currentProjectUserId () {
            if (this.currentProject && this.currentProject.teams.length) {
                return this.currentProject.teams.map((item) => {
                    return item.user._id
                })
            }
            return []
        },
        currentProjectNumberOfList () {
            let count = null
            this.currentUserProjects.forEach((data) => {
                if(data._id === this.$route.params.id ) {
                    count = data.numberOfLists
                }
            })
            return count
        }
    },
    methods: {
        showAdd () {
            this.$refs.addList.enable()
        },
        showAddUser () {
            this.$refs.showUserList.disable()
            this.$refs.showAddUser.enable()
        },
        enableRoleSelection (clear = true) {
            this.$refs.showRoleSelection.enable()
            let tempSelectedRole = []
            if(clear) {
                this.selectedRole = []
            }
            this.getAllRoles.forEach(item => {
                tempSelectedRole.push({_id: item._id, state: false})
            })
            tempSelectedRole.forEach((item) => {
                let matched = _.find(this.selectedRole, {_id: item._id})
                if (matched) {
                    item.state = matched.state
                }
            })
            this.selectedRole = tempSelectedRole
        },
        addList () {
            this.$apollo.mutate({
                mutation: CreateListGQL,
                variables: {
                    name: this.name,
                    _id: this.$route.params.id
                },
                // Update the cache with the result
                // The query will be updated with the optimistic response
                // and then with the real result of the mutation
                refetchQueries: [{
                    query: CurrentProjectGQL,
                    variables: {
                        _id: this.$route.params.id
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
                if (result.data && result.data.createList) {
                    this.name = ''
                    this.$snackbar.run({message: 'Successfully added new list'})
                }
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to add new list', type: 'color-pink'})
            })
            this.$refs.addList.disable()
        },
        showUserList () {
            this.$refs.showUserList.enable()
            this.$refs.tabHeader.$el.children[0].slick.reinit()
            this.$refs.tabContent.$el.children[0].slick.reinit()
        },
        getUser (user) {
            this.selectedUser = user
            this.enableRoleSelection()
        },
        selectUser (teamMember) {
            this.selectedUser = teamMember.user
            this.$refs.showUserList.disable()
            this.selectedRole = teamMember.roles.map((role) => {
                return {_id: role._id, state: true}
            })

            this.enableRoleSelection(false)
        },
        addUserAndRole() {
            this.$refs.showRoleSelection.disable()
            let rolesId = this.selectedRole.filter((role) => role.state).map((role) => role._id)
            this.$apollo.mutate({
                mutation: addUserAndRolesGQL,
                variables: {
                    userId: this.selectedUser._id,
                    projectId: this.$route.params.id,
                    rolesId
                },
                refetchQueries: [{
                    query: CurrentProjectGQL,
                    variables: {
                        _id: this.$route.params.id
                    }
                }],
            }).then((result) => {
                this.$snackbar.run({message: 'Successfully assigned role'})
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to assigned role', type: 'color-pink'})
            })
        }
    },
    apollo: {
        currentUser: CurrentuserGQL,
        currentUserProjects: CurrentuserProjectsGQL,
        currentProject: {
            query: CurrentProjectGQL,
            variables () {
                return {
                    _id: this.$route.params.id
                }
            },
            fetchPolicy: 'cache-and-network'
        },
        getAllRoles: GetAllRolesGQL
    }
}
</script>

<style scoped>

    .cards .veb-cards {
        transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
        -webkit-transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
        -moz-transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
    }
    .cards:hover .veb-cards {
        background: #3d5afe
    }

    .cards:hover .font-caption,
    .cards:hover .font-subhead {
        color: #eee !important;
    }

    .cards:hover .font-title {
        color: #fff !important;
    }
</style>
   
