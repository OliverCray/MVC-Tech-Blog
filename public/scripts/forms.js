const loginFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  if (name && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name: name, password: password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        document.location.replace('/')
      } else {
        const responseData = await response.json()
        alert(responseData.message || 'Failed to log in.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert('An error occurred. Please try again.')
    }
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  if (name && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, password: password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        document.location.replace('/')
      } else {
        const responseData = await response.json()
        alert(responseData.message || 'Failed to sign up.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert('An error occurred. Please try again.')
    }
  }
}

document.addEventListener('submit', (event) => {
  const element = event.target

  if (element.matches('.login-form')) {
    loginFormHandler(event)
  }

  if (element.matches('.signup-form')) {
    signupFormHandler(event)
  }
})
