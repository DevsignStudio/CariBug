import {MongoClient} from 'mongodb'
import uuid from 'uuid/v4'
const MONGO_URL = 'mongodb://localhost:27017/'

export const DB = async () => {
    try {
        let database = await MongoClient.connect(MONGO_URL)
        return await database.db('blog')
    } catch (e) {
        console.log(e)
    }
}

export const Collection = (db, name) => {
    let collection = db.collection(name)

    let insertCommand = collection.insert
    let updateCommand = collection.update
    let findCommand = collection.find
    // let findOneCommand = collection.findOne

    collection.insert = async (user, ...args) => {
        args[0]._id = uuid()
        args[0].insertedBy = user ? user._id : null
        args[0].updatedBy = user ? user._id : null
        args[0].insertedAt = new Date()
        args[0].updatedAt = new Date()
        args[0].isDeleted = false
        let data = await insertCommand.apply(collection, args)

        if (!data) {
            return null
        }
        return collection.findOne({_id: args[0]._id})
    }

    collection.update = (user, ...args) => {
        args[0].updatedAt = (new Date()).toString()
        args[0].updatedBy = user ? user._id : null

        return updateCommand.apply(collection, args)
    }

    collection.find = (...args) => {
        args[0].isDeleted = false

        let data = findCommand.apply(collection, args)
        return data
    }

    collection.findWithDeleted = (...args) => {
        return findCommand.apply(collection, args)
    }

    collection.findOne = async (...args) => {
        args[0].isDeleted = false

        let res = await findCommand.apply(collection, args).limit(1).toArray()
        if (res) {
            return res[0]
        }
        return null
    }

    collection.findOneWithDeleted = async (...args) => {
        let res = await findCommand.apply(collection, args).limit(1).toArray()
        if (res) {
            return res[0]
        }
        return null
    }

    collection.remove = (user) => {
        let args = [{}]
        args[0].updatedAt = (new Date()).toString()
        args[0].updatedBy = user ? user._id : null
        args[0].isDeleted = true

        return updateCommand.apply(collection, args)
    }

    return collection
}
