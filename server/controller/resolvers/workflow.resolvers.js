import WorkflowSetting from '../workflow/index'
import rpath from 'path'
import {
    WorkflowConfiguration,
    WorkflowHandler,
    WorkflowState,
    WorkflowCustomAction,
    WorkflowAuthorizeCustomAction,
    WorkflowAuthorizeRoleCustomAction
} from '~/model'

export default {
    Mutation: {
        createListItemWorkflowConfiguration: async (root, {path}, {user}) => {
            if (!user) {
                return null
            }
            let currentWorkflowConfig = await WorkflowConfiguration.find({name: 'ProjectListItem Workflow'})
            
            if (currentWorkflowConfig.length) {
                await WorkflowConfiguration.remove(user,{name: 'ProjectListItem Workflow'})
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
            result.setModifyUser(user._id)
            await result.save()
            let state = await createListItemWorkflowStateAndHandler({user, workflowConfigurationId: result.get()._id})
            if (!state) {
                return null
            }
            return result.get()._id
        },
        createWorkflowCustomAction: async (root, {name, workflowConfigurationId}, {user}) => {
            let customAction = await WorkflowCustomAction.findOne({workflowConfigurationId})
            if(customAction) {
                throw new Error('Workflow Custom Action with the same name Exist')
            }

            customAction = new WorkflowCustomAction({
                name,
                workflowConfigurationId
            })
            customAction.setModifyUser(user._id)
            await customAction.save()

            return customAction.get()
        },
        createWorkflowAuthorizeCustomAction: async (root, {workflowCustomActionId, workflowStateId, authorize, workflowConfigurationId}, {user}) => {
            let customAuthorizeAction = await WorkflowAuthorizeCustomAction.findOne({workflowConfigurationId, workflowCustomActionId, workflowStateId})

            if(!customAuthorizeAction) {
                customAuthorizeAction = new WorkflowAuthorizeCustomAction({
                    workflowCustomActionId,
                    workflowStateId,
                    workflowConfigurationId,
                    authorize
                })
            }

            customAuthorizeAction.set('authorize', authorize)
            customAuthorizeAction.setModifyUser(user._id)
            await customAuthorizeAction.save()

            return customAuthorizeAction.get()
        },
        createWorkflowAuthorizeRoleCustomAction: async (root, {workflowAuthorizeCustomActionId, roleId}, {user}) => {
            let customAuthorizeAction = await WorkflowAuthorizeCustomAction.findOne({_id: workflowAuthorizeCustomActionId})

            if (!customAuthorizeAction) throw new Error('Workflow authorize custom action not exists')
            let workflowAuthorizeRoleCustomAction = new WorkflowAuthorizeRoleCustomAction({
                workflowAuthorizeCustomActionId,
                roleId
            })

            workflowAuthorizeRoleCustomAction.setModifyUser(user._id)
            await workflowAuthorizeRoleCustomAction.save()
            return workflowAuthorizeRoleCustomAction.get()
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
    state0.setModifyUser(user._id)
    state1.setModifyUser(user._id)
    state2.setModifyUser(user._id)
    state3.setModifyUser(user._id)
    state4.setModifyUser(user._id)
    state5.setModifyUser(user._id)
    state6.setModifyUser(user._id)
    await Promise.all([
        await state0.save(),
        await state1.save(),
        await state2.save(),
        await state3.save(),
        await state4.save(),
        await state5.save(),
        await state6.save()
    ])

    let handler0 = new WorkflowHandler({internalName: 'create', displayName: 'Create', isStart: true, startStateId:  null, endStateId: state0.get()._id, workflowConfigurationId})
    let handler1 = new WorkflowHandler({internalName: 'assign', displayName: 'Assign', startStateId:  state0.get()._id, endStateId: state1.get()._id, workflowConfigurationId})
    let handler2 = new WorkflowHandler({internalName: 'doing', displayName: 'Mark As Doing', startStateId:  state1.get()._id, endStateId: state2.get()._id, workflowConfigurationId})
    let handler3 = new WorkflowHandler({internalName: 'done', displayName: 'Mark As Done', startStateId:  state2.get()._id, endStateId: state3.get()._id, workflowConfigurationId})
    let handler4 = new WorkflowHandler({internalName: 'verify', displayName: 'Verify', startStateId:  state3.get()._id, endStateId: state4.get()._id, workflowConfigurationId})
    let handler5 = new WorkflowHandler({internalName: 'unverify', displayName: 'Unverify', startStateId:  state3.get()._id, endStateId: state5.get()._id, workflowConfigurationId})
    let handler6 = new WorkflowHandler({internalName: 'inproduction', displayName: 'Move Production', startStateId:  state4.get()._id, endStateId: state6.get()._id, workflowConfigurationId})
    let handler7 = new WorkflowHandler({internalName: 'resubmit', displayName: 'Done', startStateId:  state5.get()._id, endStateId: state3.get()._id, workflowConfigurationId})

    handler0.setModifyUser(user._id)
    handler1.setModifyUser(user._id)
    handler2.setModifyUser(user._id)
    handler3.setModifyUser(user._id)
    handler4.setModifyUser(user._id)
    handler5.setModifyUser(user._id)
    handler6.setModifyUser(user._id)
    handler7.setModifyUser(user._id)
    await Promise.all([
        await handler0.save(),
        await handler1.save(),
        await handler2.save(),
        await handler3.save(),
        await handler4.save(),
        await handler5.save(),
        await handler6.save(),
        await handler7.save()
    ])

    return true
}
