const db = require('../database/dbConfig')

module.exports={
    find,
    add,
    findBy,
    getUsersAilments,
    addAilment,
    deleteUsersAilment,
    updateUsersAilment,
    deleteUser,
    updateUser,
    findUserId,
    getAllUsersAilments
}

function find(){
    return db('users')
}

function add(user){
    return db('users').insert(user, 'id')
    // .then(ids =>{
    //     return findBy(ids[0])
    // })
}

function findUserId(id){
    return db('users').where({id})
}

function findBy(filter){
    //console.log(id)
    return db('users').where(filter)
}

function getUsersAilments(user_id, ailment_id){
    return db('ailments')
        // .select()
        //.select( 'users.username as Username', 'ailments.ailment_name as User\'s Ailment', 'ailments.description as Ailment Description','ailments.id')
        //.join('users',  'ailments.user_id','users.id',)
        //.orderBy('ailments.id')
        .where({id : ailment_id, user_id: user_id })
}

function getAllUsersAilments(user_id){
    return db('ailments')
        // .select()
        //.select( 'users.username as Username', 'ailments.ailment_name as User\'s Ailment', 'ailments.description as Ailment Description','ailments.id')
        //.join('users',  'ailments.user_id','users.id',)
        //.orderBy('ailments.id')
        .where({user_id: user_id })
}

function addAilment (ailmentInfo){
    return db('ailments')
        .insert(ailmentInfo, 'id')
        .then(ids =>{
            //console.log(ids)
            return getUsersAilments(ailmentInfo.user_id, ids[0])
        })
}

function deleteUsersAilment(id){
    return db('ailments')
            .where('id', id)
            .del()
}

function deleteUser(id){
    return db('users')
    .where('id', id)
    .del()
}

function updateUsersAilment(changes, ailment_id){
        return db('ailments')
                .where({id: ailment_id}).update(changes)
}

function updateUser(changes, id){
    return db('users')
    .where({id}).update(changes)
}