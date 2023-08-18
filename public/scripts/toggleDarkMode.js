const toggleDarkModeButton = document.querySelector('#dark-mode-toggle')
const darkModeEnabled = localStorage.getItem('darkModeEnabled')

if (darkModeEnabled === 'true') {
  document.documentElement.classList.add('dark')
  document.querySelector('#sun-icon').removeAttribute('hidden')
  document.querySelector('#moon-icon').setAttribute('hidden', '')
}

toggleDarkModeButton.addEventListener('click', (event) => {
  event.preventDefault()
  const isDarkMode = document.documentElement.classList.toggle('dark')
  document.querySelector('#sun-icon').toggleAttribute('hidden', !isDarkMode)
  document.querySelector('#moon-icon').toggleAttribute('hidden', isDarkMode)
  localStorage.setItem('darkModeEnabled', isDarkMode)
})
