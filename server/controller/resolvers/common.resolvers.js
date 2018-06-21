import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    User, 
} from '../../model/index.js'

export default {
    Mutation: {
        signup: async (root, {username, password}, {secrets}) => {
            let user = await User.findOne({username})
            if (user) {
                throw new Error('User already exists')
            }
            let hashedPassword = await bcrypt.hash(password, 10)
            user = new User({
                username,
                password: hashedPassword
            })
            await user.save()

            let getUser = user.get()
            let token = jwt.sign(getUser, secrets.KEY)
            getUser.token = token
            return getUser
        },
        login: async (root, {username, password}, {secrets}) => {
            const user = await User.findOne({ username })
            let getUser = user.get()
            if (!user) {
                throw new Error('Username not found')
            }

            const validPassword = await bcrypt.compare(password, getUser.password)
            if (!validPassword) {
                throw new Error('Password is incorrect')
            }
            getUser.token = jwt.sign(getUser, secrets.KEY)
            return getUser
        }
    }
}
