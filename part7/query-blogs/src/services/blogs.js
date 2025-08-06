import api from '../libs/axios'

const getAll = async () => {
  const res = await api.get('/blogs')
  return res.data
}

const create = async (payload) => {
  console.log('payload', payload)
  const { title, author, url } = payload

  if(!title || !author || !url)
    throw new Error('Blog imformation are required')

  const res = await api.post('blogs', payload)
  return res.data
}

const update = async (payload, token) => {
  const res = await api.put(`blogs/${payload.id}`, payload)
  return res.data
}

const remove = async (id, token) => {
  await api.delete(`blogs/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove
}