import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

function get(keyword) {
  const promise = axios.get(`${baseUrl}/all`)
  return promise
    .then(res => {
      return res.data.filter(item => item.name.common.toLowerCase().includes(keyword.toLowerCase()))
    })
    .catch(err => err)
}

export default { get }