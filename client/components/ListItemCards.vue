<template>
    <div>
        <div v-if="!items || items.length === 0">
            <div class="font-subhead color-grey font-center" style="line-height: 56px;"><b>Heads Up!</b> No item to show</div>
        </div>
        
        <fade-transition group>
            <div class="col-xs-fluid-24" v-for="listitem in items" :key="listitem._id">
                <veb-cards class="cards-details">
                    <div class="cards-toggler">
                        <veb-cards-content style="padding: 12px 24px;padding-bottom: 6px;" v-ripple>
                            <div class="font-subhead font-medium"  >{{listitem.title}}</div>
                        </veb-cards-content>
                    </div>
                    <div>
                        <veb-divider></veb-divider>
                        <veb-cards-content style="padding: 12px 24px;padding-top: 6px">
                            <pre class="font-body" style="background: none; font-family: 'Roboto'" v-html="listitem.description"></pre>
                        </veb-cards-content>
                        <veb-cards-content>
                            <div style="padding: 6px 24px" class="font-body background-grey-100" v-if="listitem.developerId">
                                <b>Developer :</b> {{listitem.Developer.username}}                                                               
                            </div>
                        </veb-cards-content>
                        <veb-cards-action class="background-grey-100">
                            <div class="pull-right">
                                <span>
                                    <veb-icon-button name="comment-plus-outline" style="float:left"></veb-icon-button>
                                    <veb-icon-button name="comment-text-multiple" style="float:left"></veb-icon-button>
                                </span>
                                <veb-button v-for="handler in listitem.availableHandler" :key="handler.internalName" :button-style="handler.internalName === 'unverify' ? 'flat' : 'color'" :class="handler.internalName === 'unverify' ? 'color-pink' : 'primary'" @click="action(handler.internalName, {recordId: listitem._id} )" v-ripple style="float: right">{{handler.displayName}}</veb-button>
                            </div>
                        </veb-cards-action>
                    </div>
                </veb-cards>
            </div>
        </fade-transition>
    </div>
</template>

<script>
import Helper from '~/assets/helper'
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
import ProjectListItemGetAllGQL from '~/apollo/query/projectListItemGetAll.gql'
import StateActionListItemGQL from '~/apollo/query/stateActionListItem.gql'
export default {
    props: {
        items: {
            default: []
        }
    },
    data() {
        return {
            currentUser: null
        }
    },
    methods: {
        toggleHeight(e) {
            let cards = Helper.findAncestor(e.target, 'veb-cards')
            Helper.toggleClass(cards, 'show')
            if (Helper.hasClass(cards, 'show')){
                cards.style.maxHeight = (cards.children[1].scrollHeight + 48) + 'px'
            } else {
                cards.style.maxHeight = 48 + 'px'
            }
            
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
        currentUser: CurrentuserGQL
    }
}
</script>

<style scoped>
    /* .no-hover:hover {
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
    } */
</style>


