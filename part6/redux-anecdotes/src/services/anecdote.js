import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  console.log('getall')
  const res = await axios.get(baseUrl)
  return res.data
}

const createOne = async payload => {
  const res = await axios.post(baseUrl, {
    id: getId(),
    content: payload,
    votes: 0
  })
  return res.data
}

const updateOne = async (id, payload) => {
  const res = await axios.put(`${baseUrl}/${id}`, payload)
  return res.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

export default {
  getAll,
  createOne,
  updateOne
}