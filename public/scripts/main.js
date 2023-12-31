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

const toggleMenu = (event) => {
  const menu = event.target.nextElementSibling
  const menuToggleElement = event.target // The `:` button
  menu.toggleAttribute('hidden')

  // Add an event listener to close the menu when clicking outside
  const closeMenu = (event) => {
    const clickedElement = event.target

    // Check if the clicked element is the menu toggle button
    if (menu.contains(clickedElement) || clickedElement !== menuToggleElement) {
      menu.toggleAttribute('hidden')
      document.removeEventListener('click', closeMenu)
    }
  }

  document.addEventListener('click', closeMenu)
}

const deleteItem = async (id, confirmMessage, url, successRedirect) => {
  if (confirm(confirmMessage)) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data.message)
        if (successRedirect) {
          document.location.replace(successRedirect)
        }
      } else {
        console.error('Error deleting:', data.message)
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }
}

const deleteHandler = (id, type) => {
  const confirmMessage =
    type === 'post'
      ? 'Are you sure you want to delete this post?'
      : 'Are you sure you want to delete this comment?'
  const url = type === 'post' ? `/api/posts/${id}` : `/api/comments/${id}`
  // If deleting a post, redirect to dashboard. Otherwise, redirect to current page
  const successRedirect = type === 'post' ? '/dashboard' : document.URL
  deleteItem(id, confirmMessage, url, successRedirect)
}

// Add variable to track whether editing is active
let editingState = {}

const toggleEditing = (id, type) => {
  const editForm = document.querySelector(`#edit-${type}-form-${id}`)
  const typeContainer = document.querySelector(`.${type}-container-${id}`)

  // If editing is active, show the edit form and hide the post/comment
  editForm.toggleAttribute('hidden')
  typeContainer.toggleAttribute('hidden')

  // Update the editing state
  editingState[id] = !editingState[id]
}

const updateHandler = async (typeId, type, event) => {
  event.preventDefault()
  let title, body

  if (type === 'post') {
    title = document.getElementById(`new-post-title-${typeId}`).value.trim()
    body = document.getElementById(`new-post-body-${typeId}`).value.trim()
  } else {
    body = document.getElementById(`new-comment-body-${typeId}`).value.trim()
  }

  if ((type === 'post' && title) || body) {
    try {
      const response = await fetch(`/api/${type}s/${typeId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        document.location.reload()
      } else {
        const responseData = await response.json()
        alert(responseData.message || `Failed to update ${type}`)
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert(
        `An error occurred while trying to update ${type}. Please try again.`
      )
    }
  }
}

if (document.URL.indexOf('dashboard') !== -1) {
  const newPostButton = document.querySelector('#new-post-button')
  const newPostForm = document.querySelector('#new-post-form')
  const closeFormButton = document.querySelector('#close-form-button')
  const submitPostButton = document.querySelector('#submit-post-button')

  newPostButton.addEventListener('click', (event) => {
    event.preventDefault()
    newPostForm.toggleAttribute('hidden')
    newPostButton.toggleAttribute('hidden')
  })

  submitPostButton.addEventListener('click', newPostHandler)

  closeFormButton.addEventListener('click', (event) => {
    event.preventDefault()
    newPostForm.toggleAttribute('hidden')
    newPostButton.toggleAttribute('hidden')
  })
}

document
  .querySelector('#logout-button')
  .addEventListener('click', logoutHandler)
