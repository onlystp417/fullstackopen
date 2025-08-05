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

const update = async (payload, token) => {
  const res = await axios.put(`${baseUrl}/${payload.id}`, payload)
  return res.data
}

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  create,
  update,
  remove
}