// import jwt from 'jsonwebtoken'
// import {ObjectId} from 'mongodb'
import {DB} from '../mongodb'

// let getUser = async (authorization, secrets, mongo) => {
//     const bearerLength = 'Bearer '.length
//     if (authorization && authorization.length > bearerLength) {
//         const token = authorization.slice(bearerLength)
//         const { ok, result } = await new Promise(resolve =>
//             jwt.verify(token, secrets.KEY, (err, result) => {
//                 if (err) {
//                     resolve({
//                         ok: false,
//                         result: err
//                     })
//                 } else {
//                     resolve({
//                         ok: true,
//                         result
//                     })
//                 }
//             })
//         )
//         if (ok) {
//             const user = await Collection(mongo, 'users').findOne({ _id: ObjectId(result._id) })
//             console.log(user)
//             return user
//         } else {
//             console.error(result)
//             return null
//         }
//     }
//     return null
// }

export const Context = async (headers, secrets) => {
    let mongo
    if (!mongo) {
        mongo = await DB()
    }
    // console.log(headers)
    // const user = await getUser(headers['authorization'], secrets, mongo)
    return {
        headers,
        secrets,
        mongo
    }
}
