
(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(myCodeReady)
  var recordsPerPage = 5
  var currentPage = 1

  function myCodeReady () {
    // var arrObj = $('.myrecent').data('mycodes') || ''
    // var data = JSON.parse(arrObj)
    // console.log('========================================')
    // console.log('arrObj', typeof arrObj)
    // console.log('data', typeof data)
    // console.log('arrObj', arrObj)
    // console.log('data', data)
    // console.log('========================================')
    // // --------
    // changePage(1, data)

    var itemCode = $('#itemCode')
    var selectAll = $('#select_all')
    var selectNone = $('#select_none')
    var filterBtn = $('#filter_btn')
    var deleteBtn = $('#delete_button')
    // var btnPrev = $('#btn_prev')
    // var btnNext = $('#btn_next')
    // btnPrev.on('click', prevPage, data)
    // btnNext.on('click', nextPage, data)

    deleteBtn.on('click', function () {
      // var deleteItems = document.getElementsByName('delete_item')
      // var whereDeleteItems = []
      // deleteItems.forEach(element => {
      //   if (element.checked) {
      //     whereDeleteItems.push(element.value)
      //   }
      // })
    })

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
        data: config,
        dataType: 'json',
        contentType: 'application/json'
      }).done(function (respone) {
        if (respone.success) {
          console.log('========================================')
          console.log('response', respone)
          console.log('========================================')
          $('#demo').html(JSON.stringify(respone.data))
        } else {
          $('#demo').html('loi')
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
  // function changePage (page, data) {
  //   var btnNext = $('#btn_next')
  //   var btnPrev = $('#btn_prev')
  //   var myrecent = $('#myrecent')
  //   var spanPage = $('#page')

  //   // Validate page
  //   if (page < 1) page = 1
  //   if (page > numPages(data)) page = numPages(data)

  //   myrecent.html = ''

  //   for (var i = (page - 1) * recordsPerPage; i < (page * recordsPerPage); i++) {
  //     myrecent.html += data[i].source_id + '<tab>' + data[i].language + '<br>' + data[i].created_at
  //   }
  //   spanPage.html = page

  //   if (page === 1) {
  //     btnPrev.style.visibility = 'hidden'
  //   } else {
  //     btnPrev.style.visibility = 'visible'
  //   }

  //   if (page === numPages(data)) {
  //     btnNext.style.visibility = 'hidden'
  //   } else {
  //     btnNext.style.visibility = 'visible'
  //   }
  // }

  // function numPages (data) {
  //   return Math.ceil(data.length / recordsPerPage)
  // }

  // function prevPage (data) {
  //   if (currentPage > 1) {
  //     currentPage--
  //     changePage(currentPage, data)
  //   }
  // }

  // function nextPage (data) {
  //   if (currentPage < numPages()) {
  //     currentPage++
  //     changePage(currentPage, data)
  //   }
  // }
})
