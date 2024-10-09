import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

function getAll() {
  const promise = axios.get(baseUrl)
  return promise
    .then(res => res.data)
    .catch(err => {
      throw Error(err.message)})
}

function create(newObj) {
  const promise = axios.post(baseUrl, newObj)
  return promise
    .then(res => res.data)
    .catch(err => {
      alert(err.message)})
}

export default { getAll, create }