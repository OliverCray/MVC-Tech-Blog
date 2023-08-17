const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const isEqual = (value1, value2) => {
  return value1 === value2
}

const isEdited = (createdAt, updatedAt) => {
  return createdAt.getTime() !== updatedAt.getTime()
}

const capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = { formatDate, isEqual, isEdited, capitalise }
