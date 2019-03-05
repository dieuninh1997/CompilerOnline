const express = require('express')
const myRecentRouter = express.Router()
const knex = require('../../knex')

myRecentRouter.get('/', async (req, res, next) => {
  const userInfo = req.user

  var data = []
  if (userInfo) {
    data = await knex('compile').select().where('user_id', userInfo.id)
  }

  res.render('mycodes/mycodes.html', {
    webTitle: 'My codes',
    data: data
  })
})

myRecentRouter.post('/', async (req, res, next) => {
  var data = []
  const { whereLanguageFilter, whereTimeFilter, deleteItems, userInfo } = req.data
  if (deleteItems) {
    // delete list codes
    const numberRowDeleted = await knex('compile').whereIn('source_id', deleteItems)
    if (numberRowDeleted) {
      data = await knex('compile').select().where('user_id', userInfo.id)
      res.json({
        success: true,
        message: 'Delete success',
        data
      })
    } else {
      // loi
      res.json({
        success: false,
        message: 'Delete error!',
        data: 'Error'
      })
    }
  } else {
    // filter list codes
    if (whereTimeFilter !== 'all') {
      const timeFilter = Date.now() + parseInt(whereTimeFilter)
      data = await knex('compile').select().whereIn('language', whereLanguageFilter).andWhere(function () {
        this.where('created_at', '<', timeFilter)
      })
    } else {
      data = await knex('compile').select().whereIn('language', whereLanguageFilter)
    }
    res.json({
      success: true,
      message: 'Filter success',
      data
    })
  }
})
module.exports = myRecentRouter
