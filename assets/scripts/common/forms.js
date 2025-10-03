/*
|--------------------------------------------------------------------------
| FORM UTILITIES
|--------------------------------------------------------------------------
|
| This file contains reusable form utilities that can be used across 
| different forms in the application.
|
*/

function initializePasswordToggles(selector = '.password-toggle') {
  const toggleButtons = document.querySelectorAll(selector)

  toggleButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const targetId = this.dataset.target
      const passwordInput = document.getElementById(targetId)

      if (!passwordInput) return

      // Toggle password visibility
      const type = passwordInput.type === 'password' ? 'text' : 'password'
      passwordInput.type = type

      // Toggle icon visibility
      const showIcon = this.querySelector('.fa-eye')
      const hideIcon = this.querySelector('.fa-eye-slash')

      if (type === 'text') {
        showIcon.style.display = 'none'
        hideIcon.style.display = 'inline-block'
      } else {
        showIcon.style.display = 'inline-block'
        hideIcon.style.display = 'none'
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initializePasswordToggles()
})
