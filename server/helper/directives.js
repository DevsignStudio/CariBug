import { AuthorizationError } from './error'
import jwt from 'jsonwebtoken'
import {canEdit, canViewHandler} from '~/helper/helperProjectListItem.js'

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

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
    },
    isEditableByUser: async (next, source, {settingName}, context) => {
        const token = context.headers.authorization
        if (!token) {
            throw new AuthorizationError({
                message: 'You must supply a JWT for authorization!'
            })
        }
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            context.secrets.KEY
        )
        context.user = decoded
        let _id = await next()
        let result = await canEdit(_id, context.user, settingName)
        return result
    },
    isAuthorizeByRole: async(next, source, {}, context) => {
        const token = context.headers.authorization
        if (!token) {
            throw new AuthorizationError({
                message: 'You must supply a JWT for authorization!'
            })
        }
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            context.secrets.KEY
        )
        context.user = decoded
        let data = await next()

        let obj = []
        await asyncForEach(data, async (item) => {
            let result = await canViewHandler(item.recordId, context.user, item._id)
            console.log(result)
            if (result) obj.push({
                internalName: item.internalName,
                displayName: item.displayName
            })
        });

        return obj
    }
}
export { directiveResolvers }
