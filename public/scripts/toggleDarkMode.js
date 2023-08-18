const toggleDarkModeButton = document.querySelector('#dark-mode-toggle')

toggleDarkModeButton.addEventListener('click', (event) => {
  event.preventDefault()
  document.documentElement.classList.toggle('dark')
  document.querySelector('#sun-icon').toggleAttribute('hidden')
  document.querySelector('#moon-icon').toggleAttribute('hidden')
})
