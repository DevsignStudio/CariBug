
import {
    User, 
    Project, 
    ProjectTeam} from '~/model/index.js'

import bcrypt from 'bcryptjs'

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
        users: async (root, {queryString ='', limit}, {user}) => {
            let users = await User.find({
                'username': {'$regex': queryString, '$options': 'i'}
            })

            return users.map(r => r.get())
        }
    }, 
    Mutation: {
        createUser: async (root, {username, password, email, firstName, lastName, firstTimePasswordAsk = true}, {user}) => {
            let newUser = await User.findOne({username})
            if (newUser) {
                throw new Error('User already exists')
            }
            let hashedPassword = await bcrypt.hash(password, 10)
            newUser = new User({
                username,
                password: hashedPassword,
                email,
                firstName,
                lastName,
                lastLoginDate: null,
                firstTimePasswordAsk,
                isActive: true
            })
            newUser.setModifyUser(user._id)
            await newUser.save()
            return newUser.get()
        },
        updateUser: async (root, 
            data,
            {user}
        ) => {
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    console.log(property)
                }
            }
            return user
        }
    }

    
}
