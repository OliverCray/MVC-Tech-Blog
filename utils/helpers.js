const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isCurrentPage = (currentPage, page) => {
  return currentPage === page
}

module.exports = { formatDate, isCurrentPage }
