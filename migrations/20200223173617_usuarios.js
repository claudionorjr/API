exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome', 30).notNull()
        table.string('email', 100).notNull().unique()
        table.string('senha', 80).notNull()
        table.timestamp('criadoEm').defaultTo(knex.fn.now())
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')

};