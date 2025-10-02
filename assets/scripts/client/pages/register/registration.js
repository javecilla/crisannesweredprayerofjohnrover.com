/*
|--------------------------------------------------------------------------
| REGISTRATION PAGE SCRIPT
|--------------------------------------------------------------------------
|
| This file contains the registration page specific functionality
|
*/

document.addEventListener('DOMContentLoaded', () => {
  // Password toggles are automatically initialized by forms.js
  const form = document.querySelector('.registration-form')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    form.classList.remove('was-validated')

    const password = document.getElementById('createPassword')
    const confirmPassword = document.getElementById('confirmPassword')

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match')
    } else {
      confirmPassword.setCustomValidity('')
    }

    form.classList.add('was-validated')

    if (form.checkValidity()) {
      const alert = document.createElement('div')
      alert.className = 'alert alert-success alert-dismissible fade show mt-3'
      alert.role = 'alert'
      alert.innerHTML = `
        Test: Registration Successfully
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `

      form.insertAdjacentElement('beforebegin', alert)

      form.reset()
      form.classList.remove('was-validated')
    }
  })
})
