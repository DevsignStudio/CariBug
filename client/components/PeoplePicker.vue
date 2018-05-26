<template>
    <veb-reveal ref="peoplePicker">
        <div class="row center-xs  middle-xs">
            <div class="col-xs-fluid-24 col-xd-6">
                <veb-cards>
                    <form @submit.prevent="getUser">
                        <veb-cards-content style="padding: 24px; padding-bottom: 0">
                            <div class="font-headline font-medium" style="margin-bottom: 8px">Add New User</div>
                            <veb-textfield v-model="internalValue" placeholder="Search Username" message="Only top 3 search results will show here"></veb-textfield>
                            <veb-list ref="list" class="list" style="margin-top: 6px">
                                <div v-for="(user, index) in searchUsers" :key="user._id" @click="setAsCheck(index)"> 
                                    <veb-list-item style="cursor: pointer;height: 60px" v-ripple>
                                        <span slot="left">
                                            <veb-avatar background="#999" :text="user.username"></veb-avatar>
                                        </span>
                                        <span>
                                            {{user.username}}
                                        </span>
                                        <span slot="right">
                                            <veb-icon name="check" class="icon-check color-green-300" style="z-index: 10"></veb-icon>
                                        </span>
                                    </veb-list-item>
                                    <veb-divider></veb-divider>
                                </div>
                                <veb-list-item v-if="!searchUsers.length && internalValue !== ''" style="height: 60px">
                                    <span slot="left">
                                        <veb-avatar :text="''" background="#dddddd"></veb-avatar>
                                    </span>
                                    <span class="color-grey-600">
                                        User Not Found
                                    </span>
                                    
                                </veb-list-item>
                            </veb-list>
                        </veb-cards-content>
                        <veb-cards-action>
                            <div class="pull-right">
                                <veb-button @click="disable" button-style="flat" v-ripple>cancel</veb-button>
                                <veb-button type="submit" class="primary" v-ripple><veb-icon name="account"></veb-icon>Confirm</veb-button>
                            </div>
                        </veb-cards-action>
                    </form>
                </veb-cards>
            </div>
        </div>
    </veb-reveal>
</template>

<script>
import SearchUsersGQL from '~/apollo/query/searchUsers.gql'
import Helper from '~/assets/helper'
export default {
    props: {
        value: String,
        exclude: Array
    },
    data () {
        return {
            internalValue: this.value,
            searchUsers: [],
            selectedIndex: null,
            
        }
    },
    watch: {
        value (newVal) {
            this.internalValue = newVal
        },
        internalValue() {
            if (this.selectedIndex !== null) {
                Helper.removeClass(this.$refs.list.$el.children[this.selectedIndex], 'active')
            }
            this.selectedIndex = null
        }
    },
    methods: {
        getUser () {
            this.$emit('getUser', this.searchUsers[this.selectedIndex])
            this.internalValue = ''
            this.$refs.peoplePicker.disable()
        },
        enable () {
            this.$refs.peoplePicker.enable()
        },
        disable () {
            this.$refs.peoplePicker.disable()
        },
        setAsCheck (e) {
            if (this.selectedIndex !== null) {
                Helper.removeClass(this.$refs.list.$el.children[this.selectedIndex], 'active')
            }
            Helper.addClass(this.$refs.list.$el.children[e], 'active')
            this.selectedIndex = e
        }
    },
    apollo: {
        searchUsers: {
            query: SearchUsersGQL,
            variables () {
                return {
                    queryString: this.internalValue,
                    limit: 3,
                    exclude: this.exclude
                }
            }
        }
    }
}
</script>

<style>
.list .active .veb-list-item {
    background: #eee;
}

.list .veb-list-item .icon-check {
    display: none;
}

.list .active .veb-list-item .icon-check {
    display: block;
}
</style>

