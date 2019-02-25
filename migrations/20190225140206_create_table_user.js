
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments()
    table.string('email')
    table.string('name')
    table.string('password')
    table.text('token')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
