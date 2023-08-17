const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isEqual = (value1, value2) => {
  return value1 === value2
}

const isEdited = (createdAt, updatedAt) => {
  return createdAt.getTime() !== updatedAt.getTime()
}

module.exports = { formatDate, isEqual, isEdited }
