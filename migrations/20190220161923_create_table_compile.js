
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('compile', (table) => {
    table.increments()
    table.string('source_id')
    table.text('source')
    table.text('input')
    table.text('output')
    table.string('language')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('compile')
}
