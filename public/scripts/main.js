const logoutHandler = async (event) => {
  event.preventDefault()

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    body: '',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Failed to logout')
  }
}

document
  .querySelector('#logout-button')
  .addEventListener('click', logoutHandler)
