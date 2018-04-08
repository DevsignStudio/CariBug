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

    type Project {
        _id: String
        name: String
        description: String
        ownerId: String
        owner: User
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type ProjectTeamRole {
        _id: String
        name: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type ProjectTeam {
        _id: String
        userId: String
        rolesId: [String]
        projectId: String
        user: User
        roles: [ProjectTeamRole]
        project: Project
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type Query {
        currentUser: User @isAuthenticated
        currentUserProjects: [Project] @isAuthenticated
    }

    type Mutation {
        signup(username: String, password: String): User
        login(username: String, password: String): User
        createProject(name: String, description: String): Boolean @isAuthenticated
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
