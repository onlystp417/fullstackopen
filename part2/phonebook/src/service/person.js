import axios from 'axios'

const baseUrl = '/api/persons'

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
      console.log(err)
      throw err.response.data.error
    })
}

function update(id, newObj) {
  const promise = axios.put(`${baseUrl}/${id}`, newObj)
  return promise
    .then(res => res.data)
    .catch(err => {
      console.log(err)
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