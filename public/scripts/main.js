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
      alert('An error occurred. Please try again.')
    }
  }
}

document
  .querySelector('#logout-button')
  .addEventListener('click', logoutHandler)
