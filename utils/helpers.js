const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isCurrentPage = (pageNumber, currentPage) => {
  return pageNumber === currentPage
}

const isAuthor = (sessionId, authorId) => {
  return sessionId === authorId
}

const isEdited = (createdAt, updatedAt) => {
  return createdAt.getTime() !== updatedAt.getTime()
}

module.exports = { formatDate, isCurrentPage, isAuthor, isEdited }
