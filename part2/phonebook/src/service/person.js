import axios from 'axios'

const baseUrl = 'http://localhost:8001/api/persons'

function getAll() {
  const promise = axios.get(baseUrl)
  return promise
    .then(res => res.data)
    .catch(err => err)
}

function create(newObj) {
  const promise = axios.post(baseUrl, newObj)
  return promise
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}

function update(id, newObj) {
  const promise = axios.put(`${baseUrl}/${id}`, newObj)
  return promise
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}

function remove(id) {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise
    .then(res => res.data)
    .catch(err => err)
}

export default { getAll, create, update, remove }