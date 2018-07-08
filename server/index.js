import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './schema'
import resolvers from './controller/resolver.js'
import { directiveResolvers } from './helper/directives'
import {DB} from './connector/mongorito'
import DotEnv from 'dotenv-safe'

import {
    User, 
    Project, 
    ProjectList, 
    ProjectListItem, 
    ProjectTeamRole, 
    ProjectTeam,
    WorkflowConfiguration,
    WorkflowHandler,
    WorkflowInstance,
    WorkflowState,
    ProjectListItemPriority,
    WorkflowCustomAction,
    WorkflowAuthorizeCustomAction
} from '~/model'

const dotEnvConf = DotEnv.config()

let db = null
let getDB = async function() {
    db = await DB()
    return 
}


export const context = async (req, secrets) => {
    if (!db) {
        console.log('Calling Mongo DB')
        await getDB()

        db.register(User)
        db.register(Project)
        db.register(ProjectTeam)
        db.register(ProjectTeamRole)
        db.register(ProjectList)
        db.register(ProjectListItem)
        db.register(WorkflowConfiguration)
        db.register(WorkflowHandler)
        db.register(WorkflowState)
        db.register(WorkflowInstance)
        db.register(ProjectListItemPriority)
        db.register(WorkflowCustomAction)
        db.register(WorkflowAuthorizeCustomAction)
    }

    return {
        headers: req.request.headers,
        secrets: dotEnvConf.parsed,
    }
}

let start  = async () => {
    // context()
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
