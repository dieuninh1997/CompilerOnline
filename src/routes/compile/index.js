const express = require('express')

const compileRouter = express.Router()
const HackerEarth = require('hackerearth-node')
const hackerEarthNew = new HackerEarth(
  'f1a9987351e5e961c13124c89d5d85ec52b69aa5', // Your Client Secret Key here this is mandatory
  '' // mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
)
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'compiler_online'
  }
})

compileRouter.post('/', async function (req, res, next) {
  try {
    const { source, input, language } = req.body
    let timeLimit = 1
    let memoryLimit = 0
    let langCode = 'C'
    switch (language) {
      case '1':
        langCode = 'C'
        timeLimit = 1
        memoryLimit = 262144
        break
      case '2':
        langCode = 'CPP'
        timeLimit = 1
        memoryLimit = 262144
        break

      case '3':
        timeLimit = 2
        memoryLimit = 262144
        langCode = 'CSHARP'
        break
      case '4':
        timeLimit = 2
        memoryLimit = 262144
        langCode = 'JAVA'
        break
      case '5':
        timeLimit = 1
        memoryLimit = 262144
        langCode = 'JAVASCRIPT'
        break
      case '6':
        timeLimit = 5
        memoryLimit = 262144
        langCode = 'PYTHON'
        break
      default:
        memoryLimit = 262144
        break
    }
    const config = {
      time_limit: parseInt(timeLimit) || 1, // your time limit in integer
      memory_limit: parseInt(memoryLimit) || 262144, // your memory limit in integer
      source: source, // your source code for which you want to use hackerEarth api
      input: input[0], // input against which you have to test your source code
      language: langCode // optional choose any one of them or none
    }

    const resultCompile = await hackerEarthNew.compile(config)
    const resultCompileJSON = JSON.parse(resultCompile)
    if (resultCompileJSON.compile_status !== 'OK') {
      throw new Error(resultCompileJSON.compile_status)
    }
    let resultRun = await hackerEarthNew.run(config)
    resultRun = JSON.parse(resultRun)

    // insert value to table
    const resInsert = await knex('compile').insert({
      source_id: resultRun.code_id,
      source: source,
      input: input[0],
      output: resultRun.run_status.output,
      language: langCode
    })
    console.log('========================================')
    console.log('resInsert', resInsert)
    console.log('========================================')

    res.json({
      success: true,
      message: 'resultRun success',
      data: resultRun
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
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
