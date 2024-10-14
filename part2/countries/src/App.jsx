import { useState, useEffect } from 'react'
import ctryService from './service/country'

function App() {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')
  const [sentence, setSecntence] = useState('No matches found')
  const flagStyle = {
    fontSize: '5rem',
    margin: 0
  }
  useEffect(() => {
    if(!keyword) {
      setSecntence('No matches found.')
      return
    }
    ctryService.get(keyword)
      .then(res => {
        console.log(res)
        if(res.length > 10) {
          setSecntence('Too many matches, specify another filter.')
        } else if (!res.length) {
          setSecntence('No matches found.')
        } else {
          setSecntence(null)
          setCountries(res)
        }
      })
  }, [keyword])

  function shownResult() {
    return sentence ?
      <p>{ sentence }</p>
      : countries.length === 1 ?
        (
          <>
            <h2>{ countries[0].name.common }</h2>
            { countries[0].capital.map(item => <p key={item}>Capital: { item }</p>) }
            <p>Area: { countries[0].area }</p>
            <h3>Languages:</h3>
            <ul>
              { Object.values(countries[0].languages).map(lang => <li key={lang}>{ lang }</li>) }
            </ul>
            <p style={flagStyle}>{ countries[0].flag } </p>
          </>
        )
        :(
          <ul>
            { countries.map(country => <li key={country.name.common}> {country.name.common} </li>) }
          </ul>
        )
  }

  return (
    <>
      <div>
        <label>Find countries: </label>
        <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" />
      </div>
      { shownResult() }
    </>
  )
}

export default App
