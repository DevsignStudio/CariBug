import {getConfiguration, getStartHandler} from '../workflow'
import {
    ProjectList, 
    ProjectListItem, 
} from '../../model/index.js'
import path from 'path'
export default {
    Mutation: {
        createListItem: async (root, {projectListId, title, description}, {user}) => {
            if (!user) {
                return new Error('User not exists')
            }

            let list = await ProjectList.findOne({_id: projectListId})
            if (!list) {
                return new Error('Cannot find Project List')
            }

            let listitem = new ProjectListItem({projectListId, title, description})
            listitem.setModifyUser(user._id)
            await listitem.save()

            let workflowConfiguration = await getConfiguration({workflowConfigurationName: 'ProjectListItem Workflow'})
            let workflowHandler = await getStartHandler({workflowConfigurationId: workflowConfiguration._id})

            let workflowInstance = await require(path.resolve( workflowConfiguration.settingPath)).default[workflowHandler.internalName].apply(null, [{user, handler: workflowHandler}, {recordId: listitem.get()._id}])

            listitem.set('workflowInstanceId', workflowInstance._id)
            listitem.setModifyUser(user._id)
            await listitem.save()

            return listitem.get()
        }
    }
}