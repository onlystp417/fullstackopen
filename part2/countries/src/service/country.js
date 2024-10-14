import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily'
const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY

function get(keyword) {
  const promise = axios.get(`${baseUrl}/all`)
  return promise
    .then(res => {
      return res.data.filter(item => item.name.common.toLowerCase().includes(keyword.toLowerCase()))
    })
    .catch(err => err)
}

function getWeather(latlng) {
  const promise = axios.get(openWeatherUrl, {
    params: {
      lat: latlng[0],
      lon: latlng[1],
      cnt: 1,
      appid: OPEN_WEATHER_KEY
    }
  })
  return promise
    .then(res => res.data)
    .catch(err => err)
}

export default { get, getWeather }