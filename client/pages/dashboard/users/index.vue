<template>
    <div>
        <veb-page-container style="overflow-x: hidden">
            <div class="wrapper">
                <div class="row center-xs" >
                    <div class="col-xs-fluid-24" >
                        <veb-datatable @headerClick="orderData" :sortable="true">
                            <table style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="unsortable">#</th>
                                        <th>Username</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Last Update</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="no-hover" style="height: 4px; margin: 0; padding: 0;"  v-if="$apollo.loading">
                                        <td colspan="100" style="padding: 0">
                                            <veb-progress :determinate="false"></veb-progress>
                                        </td>
                                    </tr>
                                    <tr v-for="(user, key) in users" :key="user._id">
                                        <td>{{++key}}</td>
                                        <td>{{user.username}}</td>
                                        <td>{{user.firstName}}</td>
                                        <td>{{user.lastName}}</td>
                                        <td>{{user.email}}</td>
                                        <td>
                                            <veb-chip style="margin: 0" v-if="user.isActive" name="Active" class="background-green invert"></veb-chip>
                                            <veb-chip style="margin: 0" v-if="!user.isActive" name="Inactive" class="background-pink invert"></veb-chip>
                                        </td>
                                        <td>{{ user.updatedAt | moment("from", "now")}}</td>
                                        <td class="td-action">
                                            <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                            <veb-icon-button name="pencil" class="color-grey-700"></veb-icon-button>
                                        </td>
                                    </tr>
                                    <tr class="no-hover" v-if="!users.length && !$apollo.loading">
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
            <veb-reveal ref="addUser">
                <div class="row center-xs  middle-xs">
                    <div class="col-xs-fluid-24 col-xd-6">
                        <veb-cards>
                            <form @submit.prevent="addUser">
                                <veb-cards-content style="padding: 24px; padding-bottom: 0;">
                                    <div class="font-headline font-medium" style="margin-bottom: 8px">Create User</div>
                                    <veb-textfield v-model="user.username" placeholder="Username"></veb-textfield>
                                    <veb-textfield v-model="user.password" type="password" placeholder="Password"></veb-textfield>
                                    <veb-textfield v-model="user.cpassword" type="password" placeholder="Confirm Password"></veb-textfield>
                                    <veb-textfield v-model="user.firstName" placeholder="First Name"></veb-textfield>
                                    <veb-textfield v-model="user.lastName" placeholder="Last Name"></veb-textfield>
                                    <veb-textfield v-model="user.email" placeholder="Email"></veb-textfield>
                                </veb-cards-content>
                                <veb-cards-action>
                                    <div class="pull-right">
                                        <veb-button type="submit" class="primary" v-ripple><veb-icon name="plus"></veb-icon>Create</veb-button>
                                    </div>
                                </veb-cards-action>
                            </form>
                        </veb-cards>
                    </div>
                </div>
            </veb-reveal>
        </veb-page-container>
    </div>
</template>

<script>
import pageMixins from '~/mixins/pageMixins.js'
import UsersGQL from '~/apollo/query/users.gql'
import CreateUsersGQL from '~/apollo/query/createUser.gql'
export default {
    mixins: [pageMixins],
    layout: 'dashboardLayout',
    data () {
        return {
            users: [],
            pageTitle: 'Manage User',
            user: {
                username: "",
                password: "",
                cpassword: "",
                firstName: "",
                lastName: "",
                email: ""
            }
        }
    },
    mounted () {
        this.$root.mainToolbar.registerIconAction({iconName: 'plus'},() => {
            this.showAddUser()
        })
    },
    methods: {
        showAddUser () {
            this.$refs.addUser.enable()
        },
        addUser () {
            if (this.user.password !== this.user.cpassword) {
                this.$refs.addUser.disable()
                return this.$snackbar.run({message: 'Cannot confirm the password', type: 'color-pink'})
            }
            this.$apollo.mutate({
                mutation: CreateUsersGQL,
                variables: {
                    username: this.user.username,
                    password: this.user.password,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                },
                refetchQueries: [{
                    query: UsersGQL,
                }],
            }).then((result) => {
                if (result.data && result.data.createUser) {
                    this.name = ''
                    this.$snackbar.run({message: 'Successfully added new user'})
                }
            }).catch((error) => {
                this.$snackbar.run({message: 'Failed to add new user: ' + error, type: 'color-pink'})
            })
            this.$refs.addUser.disable()
        }
    },
    apollo: {
        users: UsersGQL
    }
}
</script>
