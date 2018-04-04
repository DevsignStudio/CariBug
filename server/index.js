import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import { Schema } from './graphql/schema'
import { Context } from './graphql/context'
import DotEnv from 'dotenv-safe'

const Start = async () => {
    try {
        const app = express()
        const host = process.env.HOST || '127.0.0.1'
        const port = process.env.PORT || 3000
        const dotEnvConf = DotEnv.config()
        const schema = await Schema()
        app.set('port', port)
        app.use('/api', api)
        app.use('/graphql', bodyParser.json(), graphqlExpress(async (req) => {
            return {
                schema,
                context: await Context(req.headers, dotEnvConf.parsed)
            }
        }))

        app.use('/graphiql', graphiqlExpress({
            endpointURL: '/graphql'
        }))

        let config = require('../nuxt.config.js')
        config.dev = !(process.env.NODE_ENV === 'production')
        const nuxt = new Nuxt(config)
        if (config.dev) {
            const builder = new Builder(nuxt)
            builder.build()
        }

        app.use(nuxt.render)
        app.listen(port, host)
        console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
    } catch (e) {
        console.log(e)
    }
}

Start()
