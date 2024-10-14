import React from 'react'
import Weather from './Weather'

function Detail({ country }) {
  const flagStyle = {
    fontSize: '5rem',
    margin: 0
  }

  return (
    <>
      { country.show ? 
        <div>
          <h2>{ country.name.common }</h2>
          { country.capital.map(item => <p key={item}>Capital: { item }</p>) }
          <p>Area: { country.area }</p>
          <h3>Languages:</h3>
          <ul>
            { Object.values(country.languages).map(lang => <li key={lang}>{ lang }</li>) }
          </ul>
          <p style={flagStyle}>{ country.flag } </p>
          <Weather country={country} />
        </div>
        : null
      }
    </>
  )
}

export default Detail