const PastebinAPI = require('pastebin-js')
const pastebin = new PastebinAPI('16e87f16df0d9b29094ea6a976d75d24')// devkey 16e87f16df0d9b29094ea6a976d75d24

// pastebin
//   .createPaste('Test from pastebin-js', 'pastebin-js')
//   .then(function (data) {
//     // paste succesfully created, data contains the id
//     console.log(data)
//   })
//   .fail(function (err) {
//     // Something went wrong
//     console.log(err)
//   })
// // ctrl alt N : run code file

pastebin
  .getPaste('gii3Pxra')
  .then(function (data) {
    // data contains the raw paste
    console.log(data)
  })
  .fail(function (err) {
    // Something went wrong
    console.log(err)
  })
