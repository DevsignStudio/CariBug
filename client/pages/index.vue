<template>
    <!-- <section class="container">
        <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
        <h1 class="title">
            {{hello}}
        </h1>
        <veb-icon name="account"></veb-icon>
        <h2 style="text-align: left">
            <ul>
                <li v-for="post in posts" :key="post._id">
                    {{post.title}}
                    <ul v-if="post.comments.length">
                        <li v-for="comment in post.comments" :key="comment._id">{{comment.content}}</li>
                    </ul>
                </li>
            </ul>
        </h2>
        <ul class="users">
            <li v-for="(user, index) in users" :key="index" class="user">
                <nuxt-link :to="{ name: 'id', params: { id: index }}">
                    {{ user.name }}
                </nuxt-link>
            </li>
        </ul>
    </section> -->
    <!-- <veb-button class="primary" v-ripple>Testing 123</veb-button>
        <veb-icon name="account"></veb-icon>
        <div style="display:flex;flex:1; overflow: hidden">
        <div class="row center-xs no-gutter" style="width:100%">
                <div class="col-xs-fluid-24 col-md-10">
                    <div style="padding: 24px 12px; height:100%;">
                        <div style="height:100%; overflow: hidden; display: flex; flex-direction: column">
                            <veb-tab id="tab" class="elevation z2 background-custom-purple" v-elevation>
                                <veb-tab-item v-ripple>Modules</veb-tab-item>
                                <veb-tab-item v-ripple>Branches</veb-tab-item>
                                <veb-tab-item v-ripple>Users</veb-tab-item>
                            </veb-tab>
                            <veb-tab-content element="#tab" :size="3" style="display: flex; flex: 1">
                                <veb-tab-content-item>
                                    
                                    <div class="font-center font-body color-grey-600" style="line-height: 30px">
                                        End of Resultssss
                                    </div>
                                </veb-tab-content-item>
                                <veb-tab-content-item>
                                    
                                    <div class="font-center font-body color-grey-600" style="line-height: 30px">
                                        End of Results
                                    </div>
                                </veb-tab-content-item>
                                <veb-tab-content-item>
                                    
                                    <div class="font-center font-body color-grey-600" style="line-height: 30px">
                                        End of Results
                                    </div>
                                </veb-tab-content-item>
                            </veb-tab-content>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> -->
    <div class="wrapper" v-if="!$apollo.loading">
        <div class="row center-xs middle-xs" style="height: 100%">
            <div class="col-xs-fluid-24 col-xd-5">
                <form @submit.prevent="submit()">
                    <div>
                        <div class="font-display3 font-center color-white"><span class="font-thin">Bug</span>Zilla</div>
                        <input type="text" class="field username" placeholder="Username" v-model="username">
                        <input type="password" class="field password" placeholder="Password" v-model="password">
                        <veb-button type="submit" class="primary button" v-ripple>Login</veb-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import LoginGQL from '~/apollo/query/login.gql'
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
export default {
    data () {
        return {
            hello: '',
            getData: null,
            posts: null,
            username: '',
            password: '',
            currentUser: null
        }
    },
    created () {
        if (this.$cookies.get('token')) {
            this.$apollo.addSmartQuery('currentUser', {
                query: CurrentuserGQL,
                result ({ data, loading }) {
                    if (!loading) {
                        if (data.currentUser) {
                            return this.$router.push('/dashboard/')
                        }
                    }
                }
            })
        }
    },
    methods: {
        submit () {
            this.$apollo.mutate({
                mutation: LoginGQL,
                variables: {
                    username: this.username,
                    password: this.password
                }
                // Update the cache with the result
                // The query will be updated with the optimistic response
                // and then with the real result of the mutation
                // update: (store, { data: { newTag } }) => {
                //     // Read the data from our cache for this query.
                //     const data = store.readQuery({ query: TAGS_QUERY })
                //     // Add our tag from the mutation to the end
                //     data.tags.push(newTag)
                //     // Write our data back to the cache.
                //     store.writeQuery({ query: TAGS_QUERY, data })
                // },
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
                if (result.data && result.data.login) {
                    this.$cookies.set('token', result.data.login.token, {maxAge:31536000})
                    return this.$router.push('/dashboard/')
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    }
}
</script>

<style scoped>
.button {
    width: 100%;
    margin-top: 24px;
}

.field {
    width: 100%;
    height: 48px;
    border: 0;
    padding: 0 10px;
    margin-top: 4px;
    outline: none;
    background: #eeeeee;
    transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
    z-index: 1;
    opacity: 0.95;
}

.field:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 1;
}

.field:focus {
    transform: scale(1.2);
    background: #fff;
    z-index: 2;
    opacity: 1;
} 

.field.username:focus {
    -webkit-box-shadow: 0px 13px 21px 0px rgba(50, 50, 50, 0.1);
    -moz-box-shadow:    0px 13px 21px 0px rgba(50, 50, 50, 0.1);
    box-shadow:         0px 13px 21px 0px rgba(50, 50, 50, 0.1);
}

.field.password:focus {
    -webkit-box-shadow: 0px -13px 21px 0px rgba(50, 50, 50, 0.1);
    -moz-box-shadow:    0px -13px 21px 0px rgba(50, 50, 50, 0.1);
    box-shadow:         0px -13px 21px 0px rgba(50, 50, 50, 0.1);
}

.wrapper {
    overflow: hidden; height: 100vh;background-image: url('~assets/img/LoginConcept.png');
    background-size: cover;
    background-position: center;
}
</style>
