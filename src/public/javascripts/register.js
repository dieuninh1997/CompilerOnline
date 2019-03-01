
(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(registerReady)
  function registerReady () {
    var registerButton = $('#registerButton')

    registerButton.on('click', function () {
      // check email, password, name
      var name = $('#name').val()
      var email = $('#email').val()

      if (!validateName(name)) {
        window.alert('Hay nhap name')
      }
      if (!validateEmail(email)) {
        window.alert('Hay nhap dia chi email hop le.\nExample@gmail.com')
      }
    })
  }

  function validateName (nameField) {
    return !nameField
  }
  function validateEmail (emailField) {
    var reg = /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/

    if (reg.test(emailField.value) === false) {
      return false
    }
    return true
  }
})
