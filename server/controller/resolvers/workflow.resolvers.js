import WorkflowSetting from '../workflow/index'

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
            return result._id
        }
    },

    Query: {
        allWorkflowSetting: (root) => {
            console.log(WorkflowSetting())
            // require(path.resolve(Workflow()[0].name)).default['create'].apply(null, [collections])
            return WorkflowSetting()
        },
    } 
}