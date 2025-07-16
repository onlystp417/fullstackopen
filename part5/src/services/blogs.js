import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const res = await axios.post(baseUrl, payload, config)
  return res.data
}

export default {
  getAll,
  create
}