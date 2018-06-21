import WorkflowSetting from '../workflow/index'
import rpath from 'path'
import {
    User, 
    Project, 
    ProjectList, 
    ProjectListItem, 
    ProjectTeamRole, 
    ProjectTeam,
    WorkflowConfiguration,
    WorkflowHandler,
    WorkflowInstance,
    WorkflowState
} from '../../model'

export default {
    Mutation: {
        createListItemWorkflowConfiguration: async (root, {path}, {user}) => {
            if (!user) {
                return null
            }
            let currentWorkflowConfig = await WorkflowConfiguration.findOne({name: 'ProjectListItem Workflow'})
            
            if (currentWorkflowConfig) {
                currentWorkflowConfig.setModifierUser(user._id)
                await currentWorkflowConfig.remove()
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

            let result = new WorkflowConfiguration({name: 'ProjectListItem Workflow', settingPath: path})
            result.setModifierUser(user._id)
            await result.save()
            let state = await createListItemWorkflowStateAndHandler({user, workflowConfigurationId: result.get()._id})
            if (!state) {
                return null
            }
            return result.get()._id
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

    let state0 = new WorkflowState({status: 'Created', workflowConfigurationId})
    let state1 = new WorkflowState({status: 'Assigned', workflowConfigurationId})
    let state2 = new WorkflowState({status: 'Doing', workflowConfigurationId})
    let state3 = new WorkflowState({status: 'Done', workflowConfigurationId})
    let state4 = new WorkflowState({status: 'Verified', workflowConfigurationId})
    let state5 = new WorkflowState({status: 'Unverified', workflowConfigurationId})
    let state6 = new WorkflowState({status: 'In Production', workflowConfigurationId})
    state0.setModifierUser(user._id)
    state1.setModifierUser(user._id)
    state2.setModifierUser(user._id)
    state3.setModifierUser(user._id)
    state4.setModifierUser(user._id)
    state5.setModifierUser(user._id)
    state6.setModifierUser(user._id)
    await Promise.all([
        await state0.save(),
        await state1.save(),
        await state2.save(),
        await state3.save(),
        await state4.save(),
        await state5.save(),
        await state6.save()
    ])

    let handler0 = new WorkflowHandler({internalName: 'create', displayName: 'Create', startStateId:  null, endStateId: state0.get()._id, workflowConfigurationId})
    let handler1 = new WorkflowHandler({internalName: 'assign', displayName: 'Assign', startStateId:  state0.get()._id, endStateId: state1.get()._id, workflowConfigurationId})
    let handler2 = new WorkflowHandler({internalName: 'doing', displayName: 'Mark As Doing', startStateId:  state1.get()._id, endStateId: state2.get()._id, workflowConfigurationId})
    let handler3 = new WorkflowHandler({internalName: 'done', displayName: 'Mark As Done', startStateId:  state2.get()._id, endStateId: state3.get()._id, workflowConfigurationId})
    let handler4 = new WorkflowHandler({internalName: 'verify', displayName: 'Verify', startStateId:  state3.get()._id, endStateId: state4.get()._id, workflowConfigurationId})
    let handler5 = new WorkflowHandler({internalName: 'unverify', displayName: 'Unverify', startStateId:  state4.get()._id, endStateId: state5.get()._id, workflowConfigurationId})
    let handler6 = new WorkflowHandler({internalName: 'inproduction', displayName: 'Move Production', startStateId:  state5.get()._id, endStateId: state6.get()._id, workflowConfigurationId})

    handler0.setModifierUser(user._id)
    handler1.setModifierUser(user._id)
    handler2.setModifierUser(user._id)
    handler3.setModifierUser(user._id)
    handler4.setModifierUser(user._id)
    handler5.setModifierUser(user._id)
    handler6.setModifierUser(user._id)
    await Promise.all([
        await handler[0].save(),
        await handler[1].save(),
        await handler[2].save(),
        await handler[3].save(),
        await handler[4].save(),
        await handler[5].save(),
        await handler[6].save(),
    ])

    return true
}
