(function (cbFn) {
  cbFn(window.jQuery, window, window.ace)
})(function cbFn ($, window, ace) {
  $(compileReady)

  function compileReady () {
    var compileButton = $('#compilerButton')
    compileButton.on('click', function () {
      var editor = ace.edit('editor')

      if ($('.languageSelector').val() === '0') {
        return window.alert('Please select a language')
      }
      if (editor.getValue() === '') {
        return window.alert('Cannot compile empty source')
      }

      $('#outputRespone').text('')
      $('#outputRespone').text('Compiling... Please wait')

      var testCase = []
      testCase[0] = $('#customInput').val()
      if (!testCase.length) {
        testCase.push(' ')
      }

      var config = {
        source: editor.getValue(),
        input: testCase,
        language: $('#languageSelector').val()
      }

      $.ajax({
        type: 'POST',
        url: '/compile',
        data: JSON.stringify(config),
        dataType: 'json',
        contentType: 'application/json'
      }).done(function (respone) {
        console.log('========================================')
        console.log('data', respone)
        console.log('========================================')
        $('#outputRespone').html(respone.data.run_status.output)
        $('#outputRespone').append('<br>')
        $('#outputRespone').append(respone.data.run_status.stderr)
      })
    })
  }
})
