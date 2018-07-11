import {
    ProjectTeam,
    ProjectList, 
    ProjectListItem, 
    WorkflowInstance,
    WorkflowState,
    WorkflowHandler,
    User,
    ProjectListItemPriority,
    WorkflowAuthorizeCustomAction,
    WorkflowCustomAction,
} from '~/model/index.js'

import {isAuthorizeToSee, isAuthorizeToSeeHandler} from '~/controller/workflow'

export const canEdit = async (recordId, user, settingName) => {
    let record = (await ProjectListItem.findOne({_id: recordId})).get()
    let instance = await WorkflowInstance.findOne({_id: record.workflowInstanceId})
    let state = await WorkflowState.findOne({_id: instance.get().workflowStateId})
    let customAction = (await WorkflowCustomAction.findOne({name: settingName})).get()
    let authCustomAction = await WorkflowAuthorizeCustomAction.findOne({
        workflowStateId: state.get()._id, 
        workflowConfigurationId: state.get().workflowConfigurationId,
        workflowCustomActionId: customAction._id
    })

    let isRecordCreator = record.insertedBy === user._id
    let roles = (await ProjectTeam.findOne({userId: user._id}))
    roles = roles ? roles.get().rolesId : []
    if (!authCustomAction) {
        return false
    }
    let authorize = await isAuthorizeToSee({workflowAuthorizeCustomAction: authCustomAction, isRecordCreator, rolesId: roles})
    if (authorize && authCustomAction && authCustomAction.get().authorize) {
        return true
    }
    return false
}

export const canViewHandler = async (recordId, user, _id) => {
    let workflowHandler = await WorkflowHandler.findOne({_id})

    if (!workflowHandler) throw new Error('Handler not exixts')

    let workflowInstance = await WorkflowInstance.findOne({recordId})
    let isRecordCreator = workflowInstance.get().insertedBy === user._id

    let roles = (await ProjectTeam.findOne({userId: user._id}))
    roles = roles ? roles.get().rolesId : []
    let authorize = await isAuthorizeToSeeHandler({workflowHandler, rolesId: roles, isRecordCreator})
    if(authorize) return true

    return false
}