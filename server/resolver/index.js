import {DB, Collection} from '../mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import {prepare} from '../helpers/index'

import {
    DateTime,
    NonPositiveInt,
    PositiveInt,
    NonNegativeInt,
    NegativeInt,
    NonPositiveFloat,
    PositiveFloat,
    NonNegativeFloat,
    NegativeFloat,
    EmailAddress,
    URL
} from '@okgrow/graphql-scalars'

export default async () => {
    try {
        const db = await DB()
        const User = Collection(db, 'users')
        const Project = Collection(db, 'projects')
        const collections = {
            User,
            Project
        }
        return {
            DateTime,
            NonPositiveInt,
            PositiveInt,
            NonNegativeInt,
            NegativeInt,
            NonPositiveFloat,
            PositiveFloat,
            NonNegativeFloat,
            NegativeFloat,
            EmailAddress,
            URL,
            Query: {
                currentUser: (root, args, context) => {
                    return context.user
                },
                currentUserProjects: async (root, args, context) => {
                    let result = await Project.find({insertedBy: context.user._id}).toArray()
                    return result
                }
            },
            Project: {
                owner: async ({insertedBy}) => {
                    let user = await User.findOne({_id: insertedBy})
                    return user
                }
            },
            Mutation: {
                signup: async (root, {username, password}, {secrets}) => {
                    let user = await User.findOne({username})
                    if (user) {
                        throw new Error('User already exists')
                    }
                    let hashedPassword = await bcrypt.hash(password, 10)
                    await collections.User.insert(null, {
                        username,
                        password: hashedPassword
                    })
                    user = await User.findOne({username})
                    let token = jwt.sign(user, secrets.KEY)
                    user.token = token
                    return user
                },
                login: async (root, {username, password}, {secrets}) => {
                    const user = await User.findOne({ username })
                    if (!user) {
                        throw new Error('Username not found')
                    }
        
                    const validPassword = await bcrypt.compare(password, user.password)
                    if (!validPassword) {
                        throw new Error('Password is incorrect')
                    }
                    user.token = jwt.sign(user, secrets.KEY)
                    return user
                },
                createProject: async (root, {name, description}, {user}) => {
                    if (!user) {
                        return false
                    }
                    await Project.insert(user, {
                        name,
                        description
                    })
                    return true
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}
