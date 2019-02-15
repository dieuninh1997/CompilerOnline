const express = require('express')
const router = express.Router()
const hackerEarth = require('hackerearth-node')

const hackerEarthNew = new hackerEarth(
  'eae01eb3f153cfaf3f32034ae902d5a2b7279cf6', // Your Client Secret Key here this is mandatory
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

// home page
router.get('/', function (req, res, next) {
  res.render('index', {
    language: '1',
    langCode: 'C'
  })
})

router.post('/compile', function (req, res, next) {
  let language = req.body.language
  let timeLimit = 1
  let memoryLimit = 262144
  let langCode
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
      timeLimit = 1
      memoryLimit = 262144
      langCode = ''
      break
  }

  const config = {
    time_limit: parseInt(timeLimit) || 1, // your time limit in integer
    memory_limit: parseInt(memoryLimit) || 262144, // your memory limit in integer
    source: req.body.source, // your source code for which you want to use hackerEarth api
    input: req.body.input, // input against which you have to test your source code
    language: langCode // optional choose any one of them or none
  }

  hackerEarthNew.compile(config).then(result => {
    // res.send(JSON.stringify(result));
    console.log('result')
    res.json(result)
  }).catch(err => {
    throw err
  })
})

router.get('/changelang/:langCode/:language', function (req, res, next) {
  let language = req.params.language
  let langCode = req.params.langCode
  res.render('index', {
    language: language,
    langCode: langCode
  })
})

router.post('/', function (req, res, next) {
  // do something and return data here?
})

module.exports = router
