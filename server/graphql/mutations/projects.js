export default ({Project}) => {
    return {
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
