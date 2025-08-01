import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  console.log('[getAll] called')
  return await axios.get(baseUrl).then(res => res.data)
}

export default {
  getAll
}