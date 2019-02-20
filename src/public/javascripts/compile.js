(function (cbFn) {
  cbFn(window.jQuery, window, window.ace)
})(function cbFn ($, window, ace) {
  $(compileReady)

  function compileReady () {
    var compileButton = $('#compilerButton')
    configEditor()

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
        window.location.href = '/compile/' + respone.data.shareUrl
        if (respone.success) {
          $('#outputRespone').html(respone.data.run_status.output)
          $('#outputRespone').append('<br>')
          $('#outputRespone').append(respone.data.run_status.stderr)
        } else {
          $('#outputRespone').html(respone.message)
        }
      })
    })

    function configEditor () {
      var editor = ace.edit('editor')
      editor.setTheme('ace/theme/monokai')// iplastic
      editor.setFontSize(16)
      editor.setShowPrintMargin(false) // hide vertical line white in editor
      editor.setReadOnly(true) // disable editor

      var langMode = $('.editer').data('langcode')
      if (langMode === 'C' || langMode === 'CPP') langMode = 'c_cpp'
      var mode = `ace/mode/${langMode.toLowerCase()}`
      editor.session.setMode(mode) // default mode text, 'ace/mode/python'
      editor.getSession().setUseWorker(false) // disable check syntax
    }
  }
})
