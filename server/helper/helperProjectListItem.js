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
    WorkflowCustomAction
} from '~/model/index.js'

import {isAuthorizeToSee} from '~/controller/workflow'

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