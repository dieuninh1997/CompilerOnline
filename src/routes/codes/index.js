const express = require('express')
const myRecentRouter = express.Router()
const knex = require('../../knex')

myRecentRouter.get('/', async (req, res, next) => {
  const userInfo = req.user

  var data = []
  if (userInfo) {
    data = await knex('compile').select().where('user_id', userInfo.id)
  } else {
    const { whereLanguageFilter, whereTimeFilter } = req.data
    console.log('========================================')
    console.log('req.data', req.data)
    console.log('========================================')
    if (whereTimeFilter !== 'all') {
      const timeFilter = Date.now() + parseInt(whereTimeFilter)
      data = await knex('compile').select().whereIn('language', whereLanguageFilter).andWhere(function () {
        this.where('created_at', '<=', timeFilter)
      })
      console.log('========================================')
      console.log('data', data)
      console.log('========================================')
    } else {
      data = await knex('compile').select().whereIn('language', whereLanguageFilter)
      console.log('========================================')
      console.log('data', data)
      console.log('========================================')
    }
  }

  res.render('mycodes/mycodes.html', {
    webTitle: 'My codes',
    data: data
  })
})

module.exports = myRecentRouter
