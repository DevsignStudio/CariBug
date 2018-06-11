import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path'

export default {
    Query: {
        currentUser: (root, args, {user}) => {
            return user
        },
        currentUserProjects: async (root, args, {user, db}) => {
            let result = await db.ProjectTeam.find({userId: user._id}).toArray()
            let projectIds = result.map(res => {
                return res.projectId
            })

            result = await db.Project.find({_id: {$in: projectIds}}).toArray()
            return result
        },
        searchUsers: async (root, {queryString, limit, exclude}, {user, db}) => {
            if (!queryString) {
                return []
            }
            let result = await db.User.find({'username': {'$regex': queryString, '$options': 'i'}, '_id': {$nin: exclude}}).limit(limit).toArray()
            return result
        },
        // allWorkflowSetting: (root) => {
        //     // require(path.resolve(Workflow()[0].name)).default['create'].apply(null, [collections])
        //     return WorkflowSetting()
        // },
    },
    
    
}
