const logoutHandler = async (event) => {
  event.preventDefault()

  try {
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
  } catch (error) {
    console.error('An error occurred:', error)
    alert('An error occurred while trying to logout. Please try again.')
  }
}

const newCommentHandler = async (postId, event) => {
  event.preventDefault()

  const post_id = `${postId}`
  const body = document.querySelector(`#comment-${postId}`).value.trim()

  if (post_id && body !== '') {
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        document.location.replace(`/post/${postId}`)
      } else {
        const responseData = await response.json()
        alert(responseData.message || 'Failed to create comment')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert(
        'An error occurred while trying to create a comment. Please try again.'
      )
    }
  }
}

const newPostHandler = async (event) => {
  event.preventDefault()

  const title = document.querySelector('#post-title').value.trim()
  const body = document.querySelector('#post-body').value.trim()

  if (title && body) {
    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        document.location.replace('/dashboard')
      } else {
        const responseData = await response.json()
        alert(responseData.message || 'Failed to create post')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert(
        'An error occurred while trying to create a post. Please try again.'
      )
    }
  }
}

function toggleCommentMenu(event) {
  const commentMenu = event.target.nextElementSibling
  commentMenu.classList.toggle('hidden')
}

if (document.URL.indexOf('dashboard') !== -1) {
  const newPostButton = document.querySelector('#new-post-button')
  const newPostForm = document.querySelector('#new-post-form')
  const closeFormButton = document.querySelector('#close-form-button')
  const submitPostButton = document.querySelector('#submit-post-button')

  newPostButton.addEventListener('click', (event) => {
    event.preventDefault()
    newPostForm.classList.toggle('hidden')
    newPostButton.classList.toggle('hidden')
  })

  submitPostButton.addEventListener('click', newPostHandler)

  closeFormButton.addEventListener('click', (event) => {
    event.preventDefault()
    newPostForm.classList.toggle('hidden')
    newPostButton.classList.toggle('hidden')
  })
}

document
  .querySelector('#logout-button')
  .addEventListener('click', logoutHandler)
