import {getConfiguration, getStartHandler, getConfigurationFromInstance, getAvailableHandlers} from '../workflow'
import {
    ProjectList, 
    ProjectListItem, 
    WorkflowInstance,
    WorkflowState,
    WorkflowHandler,
    User,
    ProjectListItemPriority,
    WorkflowAuthorizeCustomAction,
    WorkflowCustomAction
} from '~/model/index.js'

import path from 'path'

export default {
    ProjectListItem: {
        state: async ({workflowInstanceId}) => {
            let workflowInstance = await WorkflowInstance.findOne({_id: workflowInstanceId})
            return (await WorkflowState.findOne({_id: workflowInstance.get().workflowStateId})).get().status
        },
        WorkflowInstance: async ({workflowInstanceId}) => {
            return (await WorkflowInstance.findOne({_id: workflowInstanceId})).get()
        },
        availableHandler: async ({workflowInstanceId}) => {
            let workflowInstance = await WorkflowInstance.findOne({_id: workflowInstanceId})
            let workflowState = await WorkflowState.findOne({_id: workflowInstance.get().workflowStateId})

            let workflowHandler = await WorkflowHandler.find({startStateId: workflowState.get()._id})
            return workflowHandler.map(r => {
                r = r.get()
                return {
                    internalName: r.internalName,
                    displayName: r.displayName
                }
            })
        },
        Developer: async({developerId}) => {
            if (!developerId) {
                return null
            }
            return (await User.findOne({_id: developerId})).get()
        },
        Priority: async({priorityId}) => {
            return (await ProjectListItemPriority.findOne({_id: priorityId})).get()
        },
        canEdit: async({_id}, args) => {
            return _id
        }
    },
    Query: {
        projectListItemGetAll: async (root, {projectListId}, {user}) => {
            if (!user) {
                return new Error('User not exists')
            }
            let query = await ProjectListItem.find({projectListId})
            return query.map(r => r.get())
        }
    },
    Mutation: {
        createListItem: async (root, {projectListId, title, description, priorityId}, {user}) => {
            if (!user) {
                return new Error('User not exists')
            }

            let list = await ProjectList.findOne({_id: projectListId})
            if (!list) {
                return new Error('Cannot find Project List')
            }

            let listitem = new ProjectListItem({projectListId, title, description, priorityId})
            listitem.setModifyUser(user._id)
            await listitem.save()

            let workflowConfiguration = (await getConfiguration({workflowConfigurationName: 'ProjectListItem Workflow'}))
            let workflowHandler = await getStartHandler({workflowConfigurationId: workflowConfiguration.get()._id})

            let workflowInstance = await require(path.resolve( workflowConfiguration.get().settingPath)).default
            .runHandler({
                user, 
                handlerName: workflowHandler.get().internalName, 
                data: {recordId: listitem.get()._id}, 
                workflowHandler
            })

            listitem.set('workflowInstanceId', workflowInstance.get()._id)
            listitem.setModifyUser(user._id)
            await listitem.save()

            return listitem.get()
        },
        updateListItem: async (root, {projectListItemId, title, description, priorityId}, {user}) => {
            let plItem = await ProjectListItem.findOne({_id: projectListItemId})
            plItem.set('title', title)
            plItem.set('description', description)
            plItem.set('priorityId', priorityId)
            await plItem.save()

            return plItem.get()
        },
        stateActionListItem: async (root, {handlerName, data}, {user}) => {
            data = JSON.parse(data)
            let projectListItem = await ProjectListItem.findOne({_id: data.recordId})
            if (!projectListItem) throw new Error('Item not found')
            let workflowInstance = await WorkflowInstance.findOne({_id: projectListItem.get().workflowInstanceId})
            
            let workflowConfiguration = await getConfigurationFromInstance({workflowInstance})
            let availableHandlers = await getAvailableHandlers({workflowConfigurationId: workflowConfiguration.get()._id, currentStateId: workflowInstance.get().workflowStateId})
            let isExistHandler = false
            availableHandlers.forEach(r => {
                if (r.get().internalName === handlerName) isExistHandler = true
            })

            if (!isExistHandler) {
                throw new Error('Cannot find any action with name: ' + handlerName)
            }
            let workflowHandler = await WorkflowHandler.findOne({internalName: handlerName, workflowConfigurationId: workflowConfiguration.get()._id})
            await require(path.resolve( workflowConfiguration.get().settingPath)).default
            .runHandler({
                user, 
                handlerName, 
                data, 
                workflowHandler
            })
            return true
        }
    }
}