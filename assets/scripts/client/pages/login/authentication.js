/*
|--------------------------------------------------------------------------
| LOGIN PAGE SCRIPT
|--------------------------------------------------------------------------
|
| This file contains the login page specific functionality
|
*/

document.addEventListener('DOMContentLoaded', () => {
  // Password toggles are automatically initialized by forms.js
  const form = document.querySelector('.login-form')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    form.classList.remove('was-validated')

    form.classList.add('was-validated')

    if (form.checkValidity()) {
      const alert = document.createElement('div')
      alert.className = 'alert alert-success alert-dismissible fade show mt-3'
      alert.role = 'alert'
      alert.innerHTML = `
        Test: Login Successfully
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `

      form.insertAdjacentElement('beforebegin', alert)

      form.reset()
      form.classList.remove('was-validated')
    }
  })
})
