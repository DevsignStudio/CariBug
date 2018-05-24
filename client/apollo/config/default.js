import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
    const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

    const authLink = setContext((_, { headers }) => {
        const token = ctx.app.$cookies.get('token')

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    })
    return {
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true
    }
}
