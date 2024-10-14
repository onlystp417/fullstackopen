import React from 'react'
import Detail from './Detail'

function List({ countries, setCountries }) {
  function handleShow(name) {
    setCountries(countries.map(country => {
      if(country.name.common === name) {
        return {
          ...country,
          show: !country.show
        }
      }
      return country
    }))
  }

  return (
    <ul>
      { countries.map(country => (
        <li key={country.name.common}>
          <span>{country.name.common} </span>
          <button onClick={() => handleShow((country.name.common))}>show</button>
          <Detail country={country}/>
        </li>
      ))}
    </ul>
  )
}

export default List