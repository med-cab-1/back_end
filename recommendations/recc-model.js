const db = require('../database/dbConfig')


module.exports = {
    find,
    getUsersReccs,
    getStrainRec,
    getAilmentRec
}

function find(){
    return db('recommendations')
    .join('strains', 'strains.id', 'recommendations.strain_id')
    .join('ailments', 'ailments.id', 'recommendations.ailment_id')
    .select('strains.name as Strain', 'strains.description as Strain Description', "ailments.name as Ailment", 'ailments.description as Ailment Description' )
}
function getUsersReccs(id){
    return db('users')
    .join('strains', 'strains.id', 'recommendations.strain_id')
    .join('ailments', 'ailments.id', 'recommendations.ailment_id')
    .join('recommendations', 'users.id', 'recommendations.user_id')
    .select( 'ailments.name as Ailment', 'strains.name as Strain Recommendation' )
    .where('users.id', id)
    
}

function getStrainRec(id){
    return db('strains')
    .join('recommendations', 'strains.id', 'recommendations.strain_id')
    .join('ailments', 'ailments.id', 'recommendations.ailment_id')
    .join('users', 'users.id', 'recommendations.user_id')
    .select('strains.name as Strain Name', 'ailments.name as Ailment Name', )
    .where('strains.id', id)
    .orderBy('strains.name')
}

function getAilmentRec(id){
    return db('strains')
    .join('recommendations', 'strains.id', 'recommendations.strain_id')
    .join('ailments', 'ailments.id', 'recommendations.ailment_id')
    .join('users', 'users.id', 'recommendations.user_id')
    .select('ailments.name as Ailment Name', 'strains.name as Recommended Strain')
    .where('ailments.id', id)
    .orderBy('strains.name')
}