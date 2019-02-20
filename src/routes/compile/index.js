const express = require('express')

const compileRouter = express.Router()
const HackerEarth = require('hackerearth-node')
const hackerEarthNew = new HackerEarth(
  'f1a9987351e5e961c13124c89d5d85ec52b69aa5', // Your Client Secret Key here this is mandatory
  '' // mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
)
/*
language    langCode            Time Limit(s)          Memory Limit
    1           C                   1                   256MB=262144
    2           CPP CPP11           1
    3           CSHARP              2
    4           JAVA                2
    5           JAVASCRIPT          1
    6           PYTHON              5
*/

compileRouter.post('/', async function (req, res, next) {
  try {
    // return res.json(req.body)
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
    res.json({
      success: true,
      message: 'resultRun success',
      data: resultRun
    })
    // // ctrl alt N : run code in a file
  } catch (error) {
    res.json({
      success: false,
      message: 'Compile error',
      data: error
    })
  }
})

compileRouter.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const dataFromPastebin = await pastebin.getPaste(id)
    console.log('========================================')
    console.log('dataFromPastebin', JSON.parse(dataFromPastebin))
    console.log('========================================')
    res.render('compile/compile.html', {
      dataFromPastebin
    })
  } catch (error) {
    console.log('getDataFromPastebin', error)
  }
})
module.exports = compileRouter
