import {createWorkflowInstance} from '~/controller/workflow'
export default {
    create: async ({user, handler}, {recordId}) => {
        // $.work
        return await createWorkflowInstance({user, recordId, workflowConfigurationId: handler.workflowConfigurationId, workflowStateId: handler.endStateId})
    },
    done () {
    }
}