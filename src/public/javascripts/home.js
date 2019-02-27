(function (cbFn) {
  cbFn(window.jQuery, window, window.ace)
})(function cbFn ($, window, ace) {
  $(homePageReady)
  function homePageReady () {
    $('select').formSelect()
    $('.sidenav').sidenav()
    $('.dropdown-trigger').dropdown()
    var language = '1'
    var langCode = 'C'
    var reload = false
    // $(window).on('beforeunload', function () {
    //   // save info somewhere
    //   if (!reload) {
    //     window.alert('Hahahaaa')
    //     return 'haha'
    //   }
    // })
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
        if (respone.success) {
          reload = true
          window.location.href = '/compile/' + respone.data.source_id
        } else {
          $('#outputRespone').html(respone.message)
        }
      })
    })

    $('#languageSelector').on('change', changeLanguage)
    $('#chkInput').on('change', showHideDiv)

    function showHideDiv (event) {
      if ($('#chkInput').is(':checked')) {
        return $('#dvInput').show()
      }
      $('#dvInput').hide()
    }

    function changeLanguage () {
      language = document.getElementById('languageSelector').value
      switch (language) {
        case '1':
          langCode = 'C'
          break
        case '2':
          langCode = 'CPP'
          break
        case '3':
          langCode = 'CSHARP'
          break
        case '4':
          langCode = 'JAVA'
          break
        case '5':
          langCode = 'JAVASCRIPT'
          break
        case '6':
          langCode = 'PYTHON'
          break
        default:
          langCode = 'TEXT'
          break
      }

      reload = true
      window.location.href = '/lang/' + langCode + '/' + language
    }

    function configEditor () {
      var editor = ace.edit('editor')
      editor.setTheme('ace/theme/monokai')// iplastic
      editor.setFontSize(16)
      editor.setShowPrintMargin(false) // hide vertical line white in editor
      editor.setReadOnly(false) // disable editor
      var langMode = $('.editer').data('langcode')
      if (langMode === 'C' || langMode === 'CPP') langMode = 'c_cpp'
      var mode = `ace/mode/${langMode.toLowerCase()}`
      editor.session.setMode(mode) // default mode text, 'ace/mode/python'
      editor.getSession().setUseWorker(false) // disable check syntax
    }
  }
})
