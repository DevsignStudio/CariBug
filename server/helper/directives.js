import { AuthorizationError } from './error'
import jwt from 'jsonwebtoken'

const directiveResolvers = {
    isAuthenticated: (next, source, args, context) => {
        const token = context.headers.authorization
        if (!token) {
            throw new AuthorizationError({
                message: 'You must supply a JWT for authorization!'
            })
        }
        try {
            const decoded = jwt.verify(
                token.replace('Bearer ', ''),
                context.secrets.KEY
            )
            context.user = decoded
            return next()
        } catch (err) {
            throw new AuthorizationError({
                message: 'You are not authorized.'
            })
        }
    },
    hasScope: (next, source, args, context) => {
        const token = context.headers.authorization
        const expectedScopes = args.scope
        if (!token) {
            throw new AuthorizationError({
                message: 'You must supply a JWT for authorization!'
            })
        }
        try {
            const decoded = jwt.verify(
                token.replace('Bearer ', ''),
                context.secrets.KEY
            )
            const scopes = decoded.scope.split(' ')
            if (expectedScopes.some(scope => scopes.indexOf(scope) !== -1)) {
                return next()
            }
        } catch (err) {
            return Promise.reject(
                new AuthorizationError({
                    message: `You are not authorized. Expected scopes: ${expectedScopes.join(
                        ', '
                    )}`
                })
            )
        }
    },
    mongoDateConverter: async (resolve, source, args) => {
        const value = await resolve()
        return new Date(value)
    }
}
export { directiveResolvers }
