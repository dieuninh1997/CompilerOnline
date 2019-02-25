
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('compile', function (table) {
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('compile', function (table) {
    table.dropForeign('user_id')
    table.dropColumn('user_id')
  })
}
