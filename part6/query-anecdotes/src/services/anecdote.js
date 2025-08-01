import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  return await axios.get(baseUrl).then(res => res.data)
}

async function create(payload) {
  return await axios.post(baseUrl, payload).then(res => res.data)
}

async function update(payload) {
  return await axios.put(`${baseUrl}/${payload.id}`, payload).then(res => res.data)
}

export default {
  getAll,
  create,
  update
}