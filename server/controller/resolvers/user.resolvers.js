
import {
    User, 
    Project, 
    ProjectTeam} from '~/model/index.js'

export default {
    Query: {
        currentUser: (root, args, {user}) => {
            return user
        },
        currentUserProjects: async (root, args, {user}) => {
            let result = await ProjectTeam.find({userId: user._id})
            let projectIds = result.map(res => {
                return res.get('projectId')
            })

            result = await Project.find({_id: {$in: projectIds}})
            return result.map(r => r.get())
        },
        searchUsers: async (root, {queryString, limit, exclude = []}, {user}) => {
            if (!queryString) {
                return []
            }
            let result = await User.limit(limit).find({'username': {'$regex': queryString, '$options': 'i'}, '_id': {$nin: exclude}})
            return result.map(r => r.get())
        },
        
    },
    
    
}
