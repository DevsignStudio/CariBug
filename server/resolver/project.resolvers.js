export default {
    Query : {
        currentProject: async (root, {_id}, {user, db}) => {
            let result = await db.Project.findOne({_id})
            return result
        },
    },
    Project: {
        owner: async ({insertedBy}, args, {db}) => {
            let user = await db.User.findOne({_id: insertedBy})
            return user
        },
        lists: async ({_id}, args, {db}) => {
            let lists = await db.ProjectList.find({projectId: _id}).toArray()

            return lists
        },
        teams: async({_id}, args, {db}) => {
            let teams = await db.ProjectTeam.find({projectId: _id}).toArray()

            return teams
        },
        numberOfLists: async ({_id}, args, {db}) => {
            let count = await db.ProjectList.count({projectId: _id})
            return count
        }
    },
    ProjectTeam: {
        user: async({userId}, args, {db}) => {
            let user = await db.User.findOne({_id: userId})
            return user
        },
        project: async({projectId}, args, {db}) => {
            let project = await db.Project.findOne({_id: projectId})
            return project
        },
        roles: async({rolesId}, args, {db}) => {
            let roles = await db.ProjectTeamRole.find({_id: {$in: rolesId}}).toArray()

            return roles
        }
    },
    Mutation: {
        createProject: async (root, {name, description}, {user, db}) => {
            if (!user) {
                return false
            }
            let roleOwner = await db.ProjectTeamRole.findOne({name: 'Owner'})
            let project = await db.Project.insert(user, {name,description})

            if (!project) {
                return false
            }

            let projectOwner = await db.ProjectTeam.insert(user, {userId: user._id, rolesId: [roleOwner._id], projectId: project._id})

            return true
        },
        createProjectTeamRole: async (root, {name}, {user, db}) => {
            if (!user) {
                return false
            }

            let role = await db.ProjectTeamRole.findOne({name})

            if (role) {
                return false
            }

            await db.ProjectTeamRole.insert(user, {
                name
            })
            return true
        },
        
        addUserAndRoles: async (root, {projectId, userId, rolesId}, {user, db}) => {
            let userSelected = await db.User.findOne({_id: userId})
            let project = await db.Project.findOne({_id: projectId})
            let projectTeam = await db.ProjectTeam.findOne({userId, projectId})

            if(!projectTeam) {
                let projectTeam = await db.ProjectTeam.insert(user, {
                    userId: userId,
                    projectId: projectId,
                    rolesId: rolesId
                })
            } else {
                await db.ProjectTeam.update(user, {userId, projectId}, {
                    $set: {
                        rolesId
                    }
                })
            }

            return true
        },
        // createWorkflowConfiguration: async (root, {workflowSetting}, {user}) => {

        // }
    }
}