import glob from 'glob'
import path from 'path'

export default () => {
    let allFiles = []
    glob.sync( './controller/workflow/invoker/**/*.js' ).forEach( function( file ) {
        allFiles.push({
            name: file,
        })
    })
    return allFiles
}

export const createWorkflowInstance = async ({user, db, recordId, workflowConfigurationId, workflowStateId}) => {
    return await db.WorkflowInstance.insert(user, {recordId, workflowStateId, workflowConfigurationId})
}

export const getConfiguration = async ({db, workflowConfigurationName}) => {
    return await db.WorkflowConfiguration.findOne({name: workflowConfigurationName})
}

export const getStartHandler = async ({db, workflowConfigurationId}) => {
    return await db.WorkflowHandler.findOne({startStateId: null, workflowConfigurationId})
}