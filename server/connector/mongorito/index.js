import {Database, Model, ActionTypes} from 'mongorito'
import uuid from 'uuid/v4'
import serialize from 'mongorito/lib/serialize'
import {create, update} from 'mongorito/lib/actions'

const MONGO_URL = 'mongodb://localhost:27017/blog'


export const DB = async () => {
    try {
        const db = new Database(MONGO_URL);
        await db.connect();
        db.use(saveExtender)
        db.use(extendModel)
        return db
    } catch (e) {
        console.log(e)
    }
}

export const saveExtender = (model) => {    
    return ({model, dispatch}) => next => action => {
        if (action.type !== ActionTypes.SAVE) {
            return next(action);
        }

        const timestamp =  new Date()
        let id = uuid()
        const {fields} = action;
        let isCreated = true
        let updatedUser = model.get('updatedBy') ? model.get('updatedBy') : null

        if (typeof action.fields['insertedAt'] === 'undefined') {
            fields['_id'] = id
            model.set('_id', id)
            fields['insertedAt'] = timestamp
            model.set('insertedAt', timestamp)
            fields['insertedBy'] = updatedUser
            model.set('insertedBy', updatedUser)
            isCreated = false
        }

        fields['updatedAt'] = timestamp
        model.set('updatedAt', timestamp)
        fields['updatedBy'] = updatedUser
        model.set('updatedBy', updatedUser)
        fields['isDeleted'] = false
        model.set('isDeleted', false)
        return dispatch(isCreated ? update(action.fields) : create(action.fields));
    }
}

export const extendModel = Model => {
	Model.prototype.setModifyUser = function (id) {
        this.set('updatedBy', id);
	};
};


// const db = new Database('localhost/blog');
