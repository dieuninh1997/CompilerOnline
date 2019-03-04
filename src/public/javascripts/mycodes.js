
(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(myCodeReady)
  function myCodeReady () {
    var itemCode = $('#itemCode')
    var selectAll = $('#select_all')
    var selectNone = $('#select_none')
    var filterBtn = $('#filter_btn')

    filterBtn.on('click', function () {
      var filterboxes = document.getElementsByName('filter_item')
      var filterRadioes = document.getElementsByName('filter_time')
      var whereLanguageFilter = []
      var whereTimeFilter = ''
      filterboxes.forEach(element => {
        if (element.checked) {
          whereLanguageFilter.push(element.value)
        }
      })
      filterRadioes.forEach(radio => {
        if (radio.checked) {
          whereTimeFilter += radio.value
        }
      })
      console.log('========================================')
      console.log('whereLanguageFilter', whereLanguageFilter)
      console.log('whereTimeFilter', whereTimeFilter)
      console.log('========================================')
      var config = {
        whereLanguageFilter,
        whereTimeFilter
      }
      $.ajax({
        type: 'GET',
        url: '/codes',
        data: JSON.stringify(config),
        dataType: 'json',
        contentType: 'application/json'
      }).done(function (respone) {
        if (respone.success) {

        } else {
        }
      })
    })

    selectAll.on('click', function () {
      var checkboxes = document.getElementsByName('check_item')
      checkboxes.forEach(element => {
        element.checked = true
      })
    })

    selectNone.on('click', function () {
      var checkboxes = document.getElementsByName('check_item')
      checkboxes.forEach(element => {
        element.checked = false
      })
    })

    itemCode.on('click', function () {
      var sourceId = $('#source_id').text()
      window.location.href = '/compile/' + sourceId
    })
  }
})
