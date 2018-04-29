import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import store from 'store2'

export default (ctx) => {
    const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = store('token')
        // console.log(token)
        // return the headers to the context so httpLink can read them
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
