<template>
    <div>
        <veb-page-container style="overflow-x: hidden">
            <div class="wrapper" v-if="!$apollo.loading">
                <div class="row center-xs" style="margin-top: 24px;">
                    <div class="col-xs-fluid-24 col-md-fluid-9">
                        <veb-cards>
                            <form @submit.prevent="submit">
                                <veb-cards-content>
                                    
                                </veb-cards-content>
                                <veb-divider></veb-divider>
                                <veb-cards-content style="padding: 30px">
                                    <div class="font-headline" style="margin-bottom: 10px">Add a New Project</div>
                                    <veb-divider></veb-divider>
                                    <veb-textfield v-model="name" placeholder="Project Name"></veb-textfield>
                                    <veb-textfield type="multiline" v-model="description" placeholder="Project Description"></veb-textfield>
                                </veb-cards-content>
                                <veb-cards-action class="background-grey-50">
                                    <div class="pull-right">
                                        <veb-button class="primary" type="submit" v-ripple>New Project</veb-button>
                                        <veb-button button-style="flat" class="primary" @click="back" v-ripple>Cancel</veb-button>
                                    </div>
                                </veb-cards-action>
                            </form>
                        </veb-cards>
                    </div>
                </div>
            </div>
        </veb-page-container>
    </div>
</template>

<script>
import CreateProjectGQL from '~/apollo/query/createProject.gql'
export default {
    data () {
        return {
            pageTitle: 'New Project',
            name: '',
            description: ''
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
    methods: {
        submit () {
            if (!this.name || !this.description) {
                return false
            }
            this.$apollo.mutate({
                mutation: CreateProjectGQL,
                variables: {
                    name: this.name,
                    description: this.description
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
                if (result.data) {
                    return this.$router.push('/dashboard/')
                }
            }).catch((error) => {
                console.error(error)
            })
        },
        back () {
            return this.$router.go(-1)
        }
    }
}
</script>

