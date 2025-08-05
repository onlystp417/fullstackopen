export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    async function searchCountries(name) {
      const res = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      setCountry(res.data)
    }
    searchCountries(name)
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}