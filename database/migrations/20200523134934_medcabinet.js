
exports.up = function(knex) {
   return knex.schema
    .createTable('users', tbl =>{
        tbl.increments()
        tbl.string('username', 128)
            .notNullable()
            .unique()
        tbl.string('password', 269)
            .notNullable()
        tbl.string('bio', 255)
        tbl.string('fav_strains')
        tbl.string('ailments')

        // tbl.specificType('ailment_id', 'integer ARRAY')
            
    })
    .createTable('ailments', tbl =>{
        tbl.increments()
        tbl.string('ailment_name', 128).notNullable()
        tbl.string('description', 255).notNullable()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('strains', tbl =>{
        tbl.increments()
        tbl.string('strain').notNullable().unique()
        tbl.string('type').notNullable()
        tbl.string('description', 255).notNullable()
        tbl.string('effects', 128)
        tbl.integer('rating')
        tbl.string('flavor', 128)
    })
    
    .createTable('recommendations', tbl =>{
        tbl.increments()
        tbl.integer('strain_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('strains')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('ailment_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('ailments')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    
  
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recommendations')
  .dropTableIfExists('strains')
  .dropTableIfExists('ailments')
  .dropTableIfExists('users')
};
