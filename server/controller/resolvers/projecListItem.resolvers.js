import {getConfiguration, getStartHandler} from '../workflow'
import path from 'path'
export default {
    Mutation: {
        createListItem: async (root, {projectListId, title, description}, {user, db}) => {
            if (!user) {
                return new Error('User not exists')
            }

            let list = await db.ProjectList.findOne({_id: projectListId})
            if (!list) {
                return new Error('Cannot find Project List')
            }

            let listitem = await db.ProjectListItem.insert(user, {projectListId, title, description})

            let workflowConfiguration = await getConfiguration({db, workflowConfigurationName: 'ProjectListItem Workflow'})
            let workflowHandler = await getStartHandler({db, workflowConfigurationId: workflowConfiguration._id})

            let workflowInstance = await require(path.resolve( workflowConfiguration.settingPath)).default[workflowHandler.internalName].apply(null, [{user, db, handler: workflowHandler}, {recordId: listitem._id}])

            await db.ProjectListItem.update(user, {_id: listitem._id}, {$set: {workflowInstanceId: workflowInstance._id}})
            return listitem
        }
    }
}