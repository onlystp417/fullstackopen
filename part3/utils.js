function generateId(list) {
  const maxId = list.length > 0
    ? Math.max(...list.map(i => Number(i.id)))
    : 0

    return String(maxId + 1)
}

module.exports = {
  generateId
}