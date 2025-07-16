import axios from 'axios'
const baseUrl = '/api/login'

const login = async (body) => {
  const res = await axios.post(baseUrl, body)
  return res.data
}

export default { login }