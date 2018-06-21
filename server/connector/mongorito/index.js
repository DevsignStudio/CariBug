import {Database, Model, ActionTypes} from 'mongorito'
import uuid from 'uuid/v4'
const MONGO_URL = 'mongodb://localhost:27017/blog'


export const DB = async () => {
    try {
        const db = new Database(MONGO_URL);
        await db.connect();
        db.use(recordPlugin)
        return db
    } catch (e) {
        console.log(e)
    }
}

export const recordPlugin = (model) => {
    // model.findToArray = async function(...args) {
    //     console.log(this)
    //     let result = await this.find.apply(model, args)
    //     return result.map(res => res.get())
    // }
    
    return ({model, modelClass}) => next => action => {
        
        console.log(modelClass)
		if (action.type === ActionTypes.SAVE) {
			let insertedAt = model.get('insertedAt')
            if (!insertedAt) {
                model.set('_id', uuid())
                model.set('insertedAt', new Date())
            }

            model.set('updatedAt', new Date())
            model.set('isDeleted', false)
		}

		return next(action);
    }
}

// const db = new Database('localhost/blog');
