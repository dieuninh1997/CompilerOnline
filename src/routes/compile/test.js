var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'compiler_online'
  }
})

async function query () {
  await knex.schema.createTableIfNotExists('test', (table) => {
    table.increments()
    table.string('name')
  })
  const a = await knex.select().from('test')
  console.log('========================================')
  console.log('a', a)
  console.log('========================================')
  knex.destroy()
}
query()
