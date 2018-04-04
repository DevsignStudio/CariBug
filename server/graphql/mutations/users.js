import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export default ({User}) => {
    return {
        signup: async (root, {username, password}, {secrets}) => {
            let user = await User.findOne({username})
            if (user) {
                console.log(user.password)
                throw new Error('User already exists')
            }
            let hashedPassword = await bcrypt.hash(password, 10)
            await User.insert({
                username,
                password: hashedPassword
            })
            user = await User.findOne({username})
            console.log(user)
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
        }
    }
}
