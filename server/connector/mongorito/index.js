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
            fields['isDeleted'] = false
            model.set('isDeleted', false)
        }

        fields['updatedAt'] = timestamp
        model.set('updatedAt', timestamp)
        fields['updatedBy'] = updatedUser
        model.set('updatedBy', updatedUser)
        
        return dispatch(isCreated ? update(action.fields) : create(action.fields));
    }
}

export const extendModel = Model => {
    let findCommand = Model.find
    let findOneCommand = Model.findOne
    let updateCommand = Model.update
	Model.prototype.setModifyUser = function (id) {
        this.set('updatedBy', id);
    };
    
    Model.find = function(...args) {
        if (!args[0]) {
            args[0] = {}
        }
        args[0].isDeleted = false

        let data = findCommand.apply(Model, args)
        return data
    }

    Model.findWithDeleted = function(...args) {
        let data = findCommand.apply(Model, args)
        return data
    }

    Model.findOne = function(...args) {
        if (!args[0]) {
            args[0] = {}
        }
        args[0].isDeleted = false

        let data = findOneCommand.apply(Model, args)
        return data
    }

    Model.findOneWithDeleted = function(...args) {
        let data = findOneCommand.apply(Model, args)
        return data
    }

    Model.remove = async (user, query) => {
        let models = await Model.find(query)
        models.forEach(r => {
            r.set('isDeleted', true)
            r.set('updatedBy', user._id);
            r.save()
        })
        return true
    }
};


// const db = new Database('localhost/blog');
