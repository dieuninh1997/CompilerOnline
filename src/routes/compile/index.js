const express = require('express')
const compileRouter = express.Router()
const uuidv4 = require('uuid/v4')
const axios = require('axios')

const knex = require('./../../knex')

compileRouter.post('/', async function (req, res, next) {
  const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute'
  const JDOODLE_CLIENT_ID = '24c3feb96f3a0f6b5e90f7617974f8c9'
  const JDOODLE_CLIENT_SECRET = 'ff58e78a49236cf16dc8606a9fad5834fa9e31b4cba431dfb9bd27e5ac91f599'

  try {
    const { source, input, language } = req.body
    let langCode = 'c'
    switch (language) {
      case '1':
        langCode = 'c'
        break
      case '2':
        langCode = 'cpp'
        break

      case '3':
        langCode = 'csharp'
        break
      case '4':
        langCode = 'java'
        break
      case '5':
        langCode = 'javascript'
        break
      case '6':
        langCode = 'python3'
        break
      default:
        break
    }

    const program = {
      script: source,
      stdin: input[0],
      language: langCode.toLowerCase(),
      versionIndex: '0',
      clientId: JDOODLE_CLIENT_ID,
      clientSecret: JDOODLE_CLIENT_SECRET
    }

    console.log('========================================')
    console.log('program', program)
    console.log('========================================')

    const compileRequest = await axios.post(JDOODLE_ENDPOINT, program)
    console.log('========================================')
    console.log('compileRequest', compileRequest.data)
    console.log('========================================')

    const sourceID = uuidv4()
    const itemInsert = {
      source_id: sourceID,
      source: source,
      input: input[0],
      output: compileRequest.data.output,
      language: langCode
    }
    // insert value to table
    await knex('compile').insert(itemInsert)

    const resultRun = Object.assign({}, compileRequest.data, itemInsert)
    console.log('========================================')
    console.log('resultRun', resultRun)
    console.log('========================================')
    res.json({
      success: true,
      message: 'resultRun success',
      data: resultRun
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'Compile error!',
      data: error
    })
  }
})

compileRouter.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const compileInfo = await knex.select().from('compile').where('source_id', id)
    console.log('========================================')
    console.log('compileInfo', compileInfo)
    console.log('========================================')
    res.render('compile/compile.html', {
      compileInfo: compileInfo[0]
    })
  } catch (error) {
    console.log('getDataFromPastebin', error)
  }
})
module.exports = compileRouter
