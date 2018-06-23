import glob from 'glob'
import {
    WorkflowConfiguration,
    WorkflowHandler,
    WorkflowInstance,
} from '~/model/index.js'

export default () => {
    let allFiles = []
    glob.sync( './controller/workflow/invoker/**/*.js' ).forEach( function( file ) {
        allFiles.push({
            name: file,
        })
    })
    return allFiles
}

export const createWorkflowInstance = async ({user, recordId, workflowConfigurationId, workflowStateId}) => {
    let workflowInstance = new WorkflowInstance({recordId, workflowStateId, workflowConfigurationId})
    workflowInstance.setModifyUser(user._id)
    await workflowInstance.save()
    return workflowInstance
}

export const getConfiguration = async ({workflowConfigurationName}) => {
    let query = await WorkflowConfiguration.findOne({name: workflowConfigurationName})
    return query
}

export const getConfigurationFromInstance = async ({workflowInstance}) => {
    let query = await WorkflowConfiguration.findOne({_id: workflowInstance.get().workflowConfigurationId})

    return query
}

export const getStartHandler = async ({workflowConfigurationId}) => {
    let query = await WorkflowHandler.findOne({isStart: true, workflowConfigurationId})
    return query
}

export const getAvailableHandlers = async ({workflowConfigurationId, currentStateId}) => {
    let query = await WorkflowHandler.find({workflowConfigurationId, startStateId: {$in: [currentStateId, null]}})
    return query
}