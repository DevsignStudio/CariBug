import users from './mutations/users'

export default (collections) => {
    let signup = users(collections).signup
    let login = users(collections).login
    return {
        signup,
        login
    }
}
