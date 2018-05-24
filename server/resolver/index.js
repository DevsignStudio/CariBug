import {DB, Collection} from '../mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import {prepare} from '../helpers/index'

import {
    DateTime,
    NonPositiveInt,
    PositiveInt,
    NonNegativeInt,
    NegativeInt,
    NonPositiveFloat,
    PositiveFloat,
    NonNegativeFloat,
    NegativeFloat,
    EmailAddress,
    URL
} from '@okgrow/graphql-scalars'

export default async () => {
    try {
        const db = await DB()
        const User = Collection(db, 'users')
        const Project = Collection(db, 'projects')
        const ProjectTeam = Collection(db, 'projectTeams')
        const ProjectTeamRole = Collection(db, 'projectTeamRoles')
        const ProjectList = Collection(db, 'projectLists')
        const collections = {
            User,
            Project,
            ProjectTeamRole,
            ProjectTeam,
            ProjectList
        }
        return {
            DateTime,
            NonPositiveInt,
            PositiveInt,
            NonNegativeInt,
            NegativeInt,
            NonPositiveFloat,
            PositiveFloat,
            NonNegativeFloat,
            NegativeFloat,
            EmailAddress,
            URL,
            Query: {
                currentUser: (root, args, context) => {
                    return context.user
                },
                currentUserProjects: async (root, args, {user}) => {
                    let result = await ProjectTeam.find({userId: user._id}).toArray()
                    let projectIds = result.map((res) => {
                        return res.projectId
                    })
                    result = await Project.find({_id: {$in: projectIds}}).toArray()
                    return result
                },
                currentProject: async (root, {_id}, {user}) => {
                    let result = await Project.findOne({_id})
                    return result
                },
                searchUsers: async (root, {queryString, limit, exclude}, {user}) => {
                    if (!queryString) {
                        return []
                    }
                    let result = await User.find({'username': {'$regex': queryString, '$options': 'i'}, '_id': {$nin: exclude}}).limit(limit).toArray()
                    return result
                },
                getAllRoles: async (root, args, {user}) => {
                    let roles = await ProjectTeamRole.find().toArray()
                    return roles
                }
            },
            Project: {
                owner: async ({insertedBy}) => {
                    let user = await User.findOne({_id: insertedBy})
                    return user
                },
                lists: async ({_id}) => {
                    let lists = await ProjectList.find({projectId: _id}).toArray()

                    return lists
                },
                teams: async({_id}) => {
                    let teams = await ProjectTeam.find({projectId: _id}).toArray()

                    return teams
                },
                numberOfLists: async ({_id}) => {
                    let count = await ProjectList.count({projectId: _id})
                    return count
                }
            },
            ProjectTeam: {
                user: async({userId}) => {
                    let user = await User.findOne({_id: userId})
                    return user
                },
                project: async({projectId}) => {
                    let project = await Project.findOne({_id: projectId})
                    return project
                },
                roles: async({rolesId}) => {
                    let roles = await ProjectTeamRole.find({_id: {$in: rolesId}}).toArray()

                    return roles
                }
            },
            Mutation: {
                signup: async (root, {username, password}, {secrets}) => {
                    let user = await User.findOne({username})
                    if (user) {
                        throw new Error('User already exists')
                    }
                    let hashedPassword = await bcrypt.hash(password, 10)
                    await collections.User.insert(null, {
                        username,
                        password: hashedPassword
                    })
                    user = await User.findOne({username})
                    let token = jwt.sign(user, secrets.KEY)
                    user.token = token
                    return user
                },
                login: async (root, {username, password}, {secrets}) => {
                    const user = await User.findOne({ username })
                    if (!user) {
                        throw new Error('Username not found')
                    }
        
                    const validPassword = await bcrypt.compare(password, user.password)
                    if (!validPassword) {
                        throw new Error('Password is incorrect')
                    }
                    user.token = jwt.sign(user, secrets.KEY)
                    return user
                },
                createProject: async (root, {name, description}, {user}) => {
                    if (!user) {
                        return false
                    }
                    let roleOwner = await ProjectTeamRole.findOne({name: 'Owner'})
                    let project = await Project.insert(user, {name,description})

                    if (!project) {
                        return false
                    }

                    let projectOwner = await ProjectTeam.insert(user, {userId: user._id, rolesId: [roleOwner._id], projectId: project._id})

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

                    await ProjectTeamRole.insert(user, {
                        name
                    })
                    return true
                },
                createList: async (root, {name, _id}, {user}) => {
                    if (!user) {
                        return new Error('User not exists')
                    }

                    let list = await ProjectList.findOne({name, projectId: _id})

                    if (list) {
                        return new Error('List with same name already exists')
                    }

                    list = await ProjectList.insert(user, {name, projectId: _id})
                    return list
                },
                addUserAndRoles: async (root, {projectId, userId, rolesId}, {user}) => {
                    let userSelected = await User.findOne({_id: userId})
                    let project = await Project.findOne({_id: projectId})
                    let projectTeam = await ProjectTeam.findOne({userId, projectId})

                    if(!projectTeam) {
                        let projectTeam = await ProjectTeam.insert(user, {
                            userId: userId,
                            projectId: projectId,
                            rolesId: rolesId
                        })
                    } else {
                        console.log(rolesId)
                        await ProjectTeam.update(user, {userId, projectId}, {
                            $set: {
                                rolesId
                            }
                        })
                    }

                    return true
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}
