export default {
    Mutation: {
        createList: async (root, {name, _id}, {user, db}) => {
            if (!user) {
                return new Error('User not exists')
            }

            let list = await db.ProjectList.findOne({name, projectId: _id})
            if (list) {
                return new Error('List with same name already exists')
            }

            list = await db.ProjectList.insert(user, {name, projectId: _id})
            return list
        }
    }
}