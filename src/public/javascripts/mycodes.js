
(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(myCodeReady)
  function myCodeReady () {
    var itemCode = $('#itemCode')

    itemCode.on('click', function () {
      var sourceId = $('#source_id').text()
      console.log('========================================')
      console.log('sourceId', sourceId)
      console.log('========================================')
      window.location.href = '/compile/' + sourceId
    })
  }
})
