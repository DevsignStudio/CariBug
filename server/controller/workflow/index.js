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
    return workflowInstance.get()
}

export const getConfiguration = async ({workflowConfigurationName}) => {
    return (await WorkflowConfiguration.findOne({name: workflowConfigurationName})).get()
}

export const getStartHandler = async ({workflowConfigurationId}) => {
    return (await WorkflowHandler.findOne({startStateId: null, workflowConfigurationId})).get()
}