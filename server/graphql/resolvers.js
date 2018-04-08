import {DB, Collection} from '../mongodb/index'
// import {prepare} from '../helpers/index'
import {ObjectId} from 'mongodb'
import Mutation from './mutations'

import {
    DateTime,
    NonPositiveInt,
    PositiveInt,
    NonNegativeInt,
    NegativeInt,
    NonPositiveFloat,
    PositiveFloat,
    NonNegativeFloat,
    NegativeFloat,
    EmailAddress,
    URL
} from '@okgrow/graphql-scalars'

export default async () => {
    try {
        const db = await DB()
        const collections = {
            // Posts: Collection(db, 'posts'),
            // Comments: Collection(db, 'comments'),
            User: Collection(db, 'users'),
            Project: Collection(db, 'projects')
        }
        return {
            DateTime,
            NonPositiveInt,
            PositiveInt,
            NonNegativeInt,
            NegativeInt,
            NonPositiveFloat,
            PositiveFloat,
            NonNegativeFloat,
            NegativeFloat,
            EmailAddress,
            URL,
            Query: {
                currentUser: (root, args, context) => {
                    return context.user
                },
                currentUserProjects: async (root, args, context) => {
                    let result = await collections.Project.find({ownerId: context.user._id}).toArray()
                    return result
                }
            },
            // Post: {
            //     comments: async ({_id}) => {
            //         return (await collections.Comments.find({postId: _id}).toArray()).map(prepare)
            //     }
            // },
            // Comment: {
            //     post: async ({postId}) => {
            //         return prepare(await collections.Posts.findOne(ObjectId(postId)))
            //     }
            // },
            Project: {
                owner: async ({ownerId}) => {
                    let user = await collections.User.findOne({_id: ObjectId(ownerId)})
                    console.log(user[0])
                    return user
                }
            },
            Mutation: Mutation(collections)
        }
    } catch (e) {
        console.log(e)
    }
}
