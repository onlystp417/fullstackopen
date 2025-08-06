import api from '../libs/axios'

const getAll = async () => {
  const res = await api.get('/blogs')
  return res.data
}

const create = async (payload) => {
  const { title, author, url } = payload

  if(!title || !author || !url)
    throw new Error('Blog imformation are required')

  const res = await api.post('blogs', payload)
  return res.data
}

const update = async (payload) => {
  const res = await api.put(`blogs/${payload.id}`, payload)
  return res.data
}

const remove = async (blog) => {
  await api.delete(`blogs/${blog.id}`)
  return blog
}

export default {
  getAll,
  create,
  update,
  remove
}