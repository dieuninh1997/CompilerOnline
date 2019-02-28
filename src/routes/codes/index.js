const express = require('express')
const myRecentRouter = express.Router()
const knex = require('../../knex')

myRecentRouter.get('/', async (req, res, next) => {
  const userInfo = req.user
  const data = await knex('compile').select().where('user_id', userInfo.id)

  res.render('mycodes/mycodes.html', {
    webTitle: 'My codes',
    data: data
  })
})
module.exports = myRecentRouter
