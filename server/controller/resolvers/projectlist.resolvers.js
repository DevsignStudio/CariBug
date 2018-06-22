import {
    ProjectList, 
} from '~/model/index.js'

export default {
    Mutation: {
        createList: async (root, {name, _id}, {user}) => {
            if (!user) {
                return new Error('User not exists')
            }

            let list = await ProjectList.findOne({name, projectId: _id})
            if (list) {
                return new Error('List with same name already exists')
            }

            list = new ProjectList({name, projectId: _id})
            list.setModifyUser(user._id)
            await list.save()

            return list.get()
        }
    }
}