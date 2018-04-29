import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './schema'
import Resolvers from './resolver'
import { directiveResolvers } from './helper/directives'
import {DB} from './mongodb'
import DotEnv from 'dotenv-safe'

const dotEnvConf = DotEnv.config()


export const context = async (req, secrets) => {
    let mongo
    if (!mongo) {
        mongo = await DB()
    }
    // const user = await getUser(headers['authorization'], secrets, mongo)
    return {
        headers: req.request.headers,
        secrets: dotEnvConf.parsed,
        mongo
    }
}

let start  = async () => {
    const options = {
        port: 4000,
        endpoint: '/graphql',
        subscriptions: '/subscriptions',
        playground: '/playground',
    }
    let resolvers = await Resolvers()
    const server = new GraphQLServer({ typeDefs, resolvers, context, directiveResolvers })
    server.start(options, ({port}) => {
        console.log(`Server is running on localhost:${port}`)
    })
}

start()
