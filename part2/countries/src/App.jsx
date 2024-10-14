import { useState, useEffect } from 'react'
import ctryService from './service/country'
import Detail from './components/Detail'
import List from './components/List'

function App() {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')
  const [sentence, setSecntence] = useState('No match was found')

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
          setSecntence('No match was found.')
        } else {
          setSecntence('')
          setCountries(res.map(item => ({
            ...item,
            show: false
          })))
        }
      })
  }, [keyword])

  function showResult() {
    return sentence ?
      <p>{ sentence }</p>
      : countries.length === 1 ?
        <Detail country={countries[0]} />
        : <List countries={countries} setCountries={setCountries} />
  }

  return (
    <>
      <div>
        <label>Find countries: </label>
        <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" />
      </div>
      { showResult() }
    </>
  )
}

export default App
