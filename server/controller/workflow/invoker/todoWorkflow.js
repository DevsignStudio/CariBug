import {createWorkflowInstance} from '../../workflow'
export default {
    create: async ({user, db, handler}, {recordId}) => {
        // $.work
        return await createWorkflowInstance({user,db, recordId, workflowConfigurationId: handler.workflowConfigurationId, workflowStateId: handler.endStateId})
    },
    done () {
    }
}