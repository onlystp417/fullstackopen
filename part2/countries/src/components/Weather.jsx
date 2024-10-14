import { useState, useEffect } from 'react'
import ctryService from '../service/country'

function Weather({ country }) {
  const [weather, setWeather] = useState({ temp: '', wind: ''})

  useEffect(() =>{
    ctryService.getWeather(country.latlng)
      .then(res => {
        console.log(res)
        setWeather({
          temp: res.current.temp,
          wind: res.current.wind_speed,
          icon: res.current.weather.icon
        })
    })
  }, [country.latlng])

  return (
    <div>
      <h3>Weather in { country.name.common }</h3>
      <p>Temperature: { weather?.temp || 32 } Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.icon || '10d'}@2x.png`} alt="Weather icon" />
      <p>Wind: { weather.wind || 222 } m/s</p>
    </div>
  )
}

export default Weather