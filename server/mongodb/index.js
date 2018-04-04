import {MongoClient} from 'mongodb'

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

    collection.insert = (...args) => {
        args[0].insertedAt = new Date()
        args[0].updatedAt = new Date()
        args[0].insertedBy = collection.getUser ? collection.getUser()._id : null
        args[0].updatedBy = collection.getUser ? collection.getUser()._id : null
        args[0].isDeleted = false
        return insertCommand.apply(collection, args)
    }

    collection.update = (...args) => {
        args[0].updatedAt = (new Date()).toString()
        args[0].updatedBy = null

        return updateCommand.apply(collection, args)
    }

    collection.find = async (...args) => {
        args[0].isDeleted = false

        let data = await findCommand.apply(collection, args)
        return data
    }

    collection.findWithDeleted = async (...args) => {
        let res = await findCommand.apply(collection, args)
        return res
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

    collection.remove = () => {
        let args = [{}]
        args[0].updatedAt = (new Date()).toString()
        args[0].updatedBy = null
        args[0].isDeleted = true

        return updateCommand.apply(collection, args)
    }

    return collection
}
