const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isCurrentPage = (pageNumber, currentPage) => {
  return pageNumber === currentPage
}

const isCommentAuthor = (userId, commentUserId) => {
  console.log('User ID:', userId)
  console.log('Comment User ID:', commentUserId)
  return userId === commentUserId
}

module.exports = { formatDate, isCurrentPage, isCommentAuthor }
