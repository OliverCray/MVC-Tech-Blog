const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isCurrentPage = (pageNumber, currentPage) => {
  return pageNumber === currentPage
}

module.exports = { formatDate, isCurrentPage }
