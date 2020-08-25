const db = require('../database/dbConfig')


module.exports = {
    find,
    add,
    findBy,
    updateAilment,
    deleteAilment
}
function find(){
    return db('ailments').select('ailment_name as Ailment\'s Name', 'description', 'user_id').orderBy('user_id')
}

function add(ailment){
    return db('ailments').insert(ailment, 'id')
    .then(ids =>{
        return findBy(ids[0])
    })
}

function findBy(id){
    //console.log(id)
    return db('ailments').where({id})
}

function updateAilment(changes, id){
    return db('ailments')
    .where({id}).update(changes)
}

function deleteAilment(id){
    return db('ailments')
    .where('id', id)
    .del()
}