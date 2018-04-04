import {makeExecutableSchema} from 'graphql-tools'
import {directiveResolvers} from './directives'
import Resolvers from './resolvers'

const typeDefs = `
    directive @isAuthenticated on QUERY | FIELD
    directive @hasScope(scope: [String]) on QUERY | FIELD
    directive @mongoDateConverter on FIELD_DEFINITION | FIELD

    scalar DateTime
    scalar NonPositiveInt
    scalar PositiveInt
    scalar NonNegativeInt
    scalar NegativeInt
    scalar NonPositiveFloat
    scalar PositiveFloat
    scalar NonNegativeFloat
    scalar NegativeFloat
    scalar EmailAddress
    scalar URL

    type Post {
        _id: String
        title: String
        content: String
        comments: [Comment]
    }

    type Comment {
        _id: String
        postId: String
        content: String
        post: Post
    }

    type User {
        _id: String
        username: String
        token: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type Query {
        post(_id: String): Post
        posts: [Post]
        comment(_id: String): Comment
        currentUser: User @isAuthenticated
    }

    type Mutation {
        createPost(title: String, content: String): Post
        createComment(postId: String, content: String): Comment
        signup(username: String, password: String): User
        login(username: String, password: String): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
    
`

const Schema = async () => {
    try {
        let resolvers = await Resolvers()
        return makeExecutableSchema({typeDefs, resolvers, directiveResolvers})
    } catch (e) {
        console.log(e)
    }
}

export {Schema}
