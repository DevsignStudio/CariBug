import {DB, Collection} from '../mongodb/index'
import {prepare} from '../helpers/index'
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
            Posts: Collection(db, 'posts'),
            Comments: Collection(db, 'comments'),
            User: Collection(db, 'users')
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
                post: async (root, {_id}) => {
                    return prepare(await collections.Posts.findOne(ObjectId(_id)))
                },
                posts: async (root, params, {secrets}) => {
                    return (await collections.Posts.find({}).toArray()).map(prepare)
                },
                comment: async (root, {_id}) => {
                    return prepare(await collections.Comments.findOne(ObjectId(_id)))
                },
                currentUser: (root, args, context) => {
                    return context.user
                }
            },
            Post: {
                comments: async ({_id}) => {
                    return (await collections.Comments.find({postId: _id}).toArray()).map(prepare)
                }
            },
            Comment: {
                post: async ({postId}) => {
                    return prepare(await collections.Posts.findOne(ObjectId(postId)))
                }
            },
            Mutation: Mutation(collections)
        }
    } catch (e) {
        console.log(e)
    }
}
