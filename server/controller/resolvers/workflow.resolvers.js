import WorkflowSetting from '../workflow/index'
import rpath from 'path'

export default {
    Mutation: {
        createListItemWorkflowConfiguration: async (root, {path}, {user, db}) => {
            if (!user) {
                return null
            }
            let currentWorkflowConfig = await db.WorkflowConfiguration.findOne({name: 'ProjectListItem Workflow'})
            
            if (currentWorkflowConfig) {
                await db.WorkflowConfiguration.remove(user, {name: 'ProjectListItem Workflow'})
            }
            let workflowSettings = WorkflowSetting()
            let pathIsExists = false

            workflowSettings.forEach(item => {
                if (item.name === path) {
                    pathIsExists = true
                }
            })

            if (!pathIsExists) {
                return null
            }

            let result = await db.WorkflowConfiguration.insert(user, {name: 'ProjectListItem Workflow', settingPath: path})
            let state = await createListItemWorkflowStateAndHandler({user, db, workflowConfigurationId: result._id})
            if (!state) {
                return null
            }
            return result._id
        }
    },
    Query: {
        allWorkflowSetting: (root) => {
            // console.log(WorkflowSetting())
            // require(path.resolve(WorkflowSetting()[0].name)).default['create'].apply(null, [collections])
            return WorkflowSetting()
        },
    } 
}


const createListItemWorkflowStateAndHandler = async ({user, db, workflowConfigurationId}) => {
    let states = await Promise.all([
        db.WorkflowState.insert(user, {status: 'Created', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'Assigned', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'Doing', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'Done', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'Verified', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'Unverified', workflowConfigurationId}),
        db.WorkflowState.insert(user, {status: 'In Production', workflowConfigurationId})
    ])

    let handlers = await Promise.all([
        db.WorkflowHandler.insert(user, {internalName: 'create', displayName: 'Create', startStateId:  null, endStateId: states[0]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'assign', displayName: 'Assign', startStateId:  states[0]._id, endStateId: states[1]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'doing', displayName: 'Mark As Doing', startStateId:  states[1]._id, endStateId: states[2]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'done', displayName: 'Mark As Done', startStateId:  states[2]._id, endStateId: states[3]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'verify', displayName: 'Verify', startStateId:  states[3]._id, endStateId: states[4]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'unverify', displayName: 'Unverify', startStateId:  states[4]._id, endStateId: states[5]._id, workflowConfigurationId}),
        db.WorkflowHandler.insert(user, {internalName: 'inproduction', displayName: 'Move Production', startStateId:  states[5]._id, endStateId: states[6]._id, workflowConfigurationId})
    ])

    return true
}
