(function (cbFn) {
  cbFn(window.jQuery, window, window.ace)
})(function cbFn ($, window, ace) {
  $(homePageReady)
  function homePageReady () {
    var language = '1'
    var langCode = 'C'
    var reload = false
    $(window).on('beforeunload', function () {
      // save info somewhere
      if (!reload) {
        window.alert('Hahahaaa')
        return 'haha'
      }
    })
    configEditor()

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
      }
      console.log('========================================')
      console.log('language', language)
      console.log('langCode', langCode)
      console.log('========================================')
      reload = true
      window.location.href = '/lang/' + langCode + '/' + language + '?reload=true'
    }

    function configEditor () {
      var editor = ace.edit('editor')
      editor.setTheme('ace/theme/monokai')
      editor.setFontSize(16)
      editor.setShowPrintMargin(false) // hide vertical line white in editor

      var langMode = $('.editer').data('langcode')
      if (langMode === 'C' || langMode === 'CPP') langMode = 'c_cpp'
      var mode = `ace/mode/${langMode.toLowerCase()}`
      editor.session.setMode(mode) // default mode text, 'ace/mode/python'
      editor.getSession().setUseWorker(false) // disable check syntax
    }
  }
})
