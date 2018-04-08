import users from './mutations/users'
import projects from './mutations/projects'

export default (collections) => {
    let signup = users(collections).signup
    let login = users(collections).login
    let createProject = projects(collections).createProject
    return {
        signup,
        login,
        createProject
    }
}
