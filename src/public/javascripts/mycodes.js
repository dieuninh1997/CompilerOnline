
(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(myCodeReady)
  function myCodeReady () {
    var itemCode = $('#itemCode')

    itemCode.on('click', function () {
      var sourceId = $('#source_id').text()
      window.location.href = '/compile/' + sourceId
    })
  }
})
