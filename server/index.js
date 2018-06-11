import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './schema'
import resolvers from './controller/resolver.js'
import { directiveResolvers } from './helper/directives'
import {DB, Collection} from './mongodb'
import DotEnv from 'dotenv-safe'

const dotEnvConf = DotEnv.config()


export const context = async (req, secrets) => {
    let mongo
    if (!mongo) {
        mongo = await DB()
    }

    let db = {
        User: Collection(mongo, 'users'),
        Project: Collection(mongo, 'projects'),
        ProjectTeamRole: Collection(mongo, 'projectTeamRoles'),
        ProjectTeam: Collection(mongo, 'projectTeams'),
        ProjectList: Collection(mongo, 'projectLists'),
        WorkflowInstance: Collection(mongo, 'workflowInstances'),
        WorkflowConfiguration: Collection(mongo, 'workflowConfigurations'),
        WorkflowState: Collection(mongo, 'workflowStates')
    }
    return {
        headers: req.request.headers,
        secrets: dotEnvConf.parsed,
        mongo,
        db
    }
}

let start  = async () => {
    const options = {
        port: 4000,
        endpoint: '/graphql',
        subscriptions: '/subscriptions',
        playground: '/playground',
    }
    const server = new GraphQLServer({ typeDefs, resolvers, context, directiveResolvers })
    server.start(options, ({port}) => {
        console.log(`Server is running on localhost:${port}`)
    })
}

start()
