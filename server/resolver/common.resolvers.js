import {DB, Collection} from '../mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import WorkflowSetting from '../workflow/index'
import path from 'path'

export default {
    Mutation: {
        signup: async (root, {username, password}, {secrets, db}) => {
            let user = await db.User.findOne({username})
            if (user) {
                throw new Error('User already exists')
            }
            let hashedPassword = await bcrypt.hash(password, 10)
            await db.User.insert(null, {
                username,
                password: hashedPassword
            })
            user = await db.User.findOne({username})
            let token = jwt.sign(user, secrets.KEY)
            user.token = token
            return user
        },
        login: async (root, {username, password}, {secrets, db}) => {
            const user = await db.User.findOne({ username })
            if (!user) {
                throw new Error('Username not found')
            }

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                throw new Error('Password is incorrect')
            }
            user.token = jwt.sign(user, secrets.KEY)
            return user
        }
    }
}
