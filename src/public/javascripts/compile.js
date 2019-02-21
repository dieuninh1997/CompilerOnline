(function (cbFn) {
  cbFn(window.jQuery, window, window.ace)
})(function cbFn ($, window, ace) {
  $(compileReady)

  function compileReady () {
    configEditor()
    function configEditor () {
      var editor = ace.edit('editor')
      editor.setTheme('ace/theme/iplastic')// iplastic
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
