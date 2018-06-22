import {
    User, 
    Project, 
    ProjectList, 
    ProjectTeamRole, 
    ProjectTeam,
} from '~/model/index.js'

export default {
    Query : {
        currentProject: async (root, {_id}, {user}) => {
            let result = await Project.findOne({_id})
            return !result ? null : result.get()
        },
        getAllRoles: async (root, args, {user}) => {
            let roles = await ProjectTeamRole.find()
            return roles.map(r => r.get())
        }
    },
    Project: {
        owner: async ({insertedBy}, args) => {
            let user = await User.findOne({_id: insertedBy})
            return user.get()
        },
        lists: async ({_id}, args) => {
            let lists = await ProjectList.find({projectId: _id})

            return lists.map(r => r.get())
        },
        teams: async({_id}, args) => {
            let teams = await ProjectTeam.find({projectId: _id})

            return teams.map(r => r.get())
        },
        numberOfLists: async ({_id}, args) => {
            let count = await ProjectList.count({projectId: _id})
            return count
        }
    },
    ProjectTeam: {
        user: async({userId}, args) => {
            let user = await User.findOne({_id: userId})
            return user.get()
        },
        project: async({projectId}, args) => {
            let project = await Project.findOne({_id: projectId})
            return project.get()
        },
        roles: async({rolesId}, args) => {
            let roles = await ProjectTeamRole.find({_id: {$in: rolesId}})

            return roles.map(r => r.get())
        }
    },
    Mutation: {
        createProject: async (root, {name, description}, {user}) => {
            if (!user) {
                return false
            }
            let roleOwner = (await ProjectTeamRole.findOne({name: 'Owner'})).get()
            let project = new Project({name,description})
            project.setModifyUser(user._id)
            project.save()

            if (!project) {
                return false
            }

            let projectOwner = new ProjectTeam({userId: user._id, rolesId: [roleOwner._id], projectId: project.get()._id})
            projectOwner.setModifyUser(user._id)
            await projectOwner.save()

            return true
        },
        createProjectTeamRole: async (root, {name}, {user}) => {
            if (!user) {
                return false
            }

            let role = await ProjectTeamRole.findOne({name})

            if (role) {
                return false
            }

            let result = new ProjectTeamRole({name})
            result.setModifyUser(user._id)
            await result.save()
            return true
        },
        
        addUserAndRoles: async (root, {projectId, userId, rolesId}, {user}) => {
            let userSelected = (await User.findOne({_id: userId})).get()
            let project = (await Project.findOne({_id: projectId})).get()
            let projectTeam = await ProjectTeam.findOne({userId, projectId})

            if(!projectTeam) {
                projectTeam = new ProjectTeam({
                    userId: userId,
                    projectId: projectId,
                    rolesId: rolesId
                })

                projectTeam.setModifyUser(user._id)
                projectTeam.save()
            } else {
                projectTeam.set('rolesId', rolesId)
                projectTeam.setModifyUser(user._id)
                projectTeam.save()
            }

            return true
        },
        // createWorkflowConfiguration: async (root, {workflowSetting}, {user}) => {

        // }
    }
}