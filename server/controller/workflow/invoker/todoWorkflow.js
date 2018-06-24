import {createWorkflowInstance} from '~/controller/workflow'
import {ProjectListItem, WorkflowConfiguration, WorkflowInstance} from "@/model"
export default {
    runHandler: async ({handlerName, user, workflowHandler, data}) => {
        if (!this.default.customImplementation[handlerName]) {
            return await this.default.defaultImplementation({user, workflowHandler, data})
        }

        return await this.default.customImplementation[handlerName]({user, workflowHandler, data})
    },
    defaultImplementation: async ({user, workflowHandler, data}) => {
        console.log(workflowHandler.get()._id)
        let workflowInstance = await WorkflowInstance.findOne({recordId: data.recordId})
        workflowInstance.set('workflowStateId', workflowHandler.get().endStateId)
        workflowInstance.setModifyUser(user._id)
        await workflowInstance.save()
        return true
    },
    customImplementation: {
        create: async ({user, workflowHandler, data}) => {
            return createWorkflowInstance({user, recordId: data.recordId, workflowConfigurationId: workflowHandler.get().workflowConfigurationId, workflowStateId: workflowHandler.get().endStateId})
        },
        assign: async ({user, workflowHandler, data}) => {
            let projectListItem = await ProjectListItem.findOne({_id: data.recordId})
            projectListItem.set('developerId', data.developerId)
            projectListItem.save()
            return await this.default.defaultImplementation({user, workflowHandler, data})
        }
    }
}