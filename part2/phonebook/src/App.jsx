import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '480-329-3176' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  function handleAdd(e) {
    let nameExist = false
    let numberExist = false
    e.preventDefault()

    // check if newName is empty string
    if(newName === '' || newNumber === '') {
      alert('Make sure to fill out all the fields.')
      return
    }

    // check if name is exist
    nameExist = persons.findIndex(person => person.name === newName) >= 0 
    numberExist = persons.findIndex(person => person.number === newNumber) >= 0 
    if(nameExist) {
      alert(`${ newName } is already added to phonebook.`)
      return
    } else if (numberExist) {
      alert(`${ newNumber } is been taken.`)
      return
    }

    // add name to the phonebook
    setPersons(persons.concat({
      id: persons.length,
      name: newName.trim(),
      number: newNumber.trim()
    }))
    setNewName('')
    setNewNumber('')
  }

  function shownList() {
    if(keyword === '')
      return persons
    return persons.filter(person => person.name.toLowerCase().includes(keyword))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with 
          <input value={keyword} onChange={event => setKeyword(event.target.value)} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          numbers: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {shownList().map(person => (
          <li key={ person.id }>
            <span>{person.name}</span>
            <span> / </span>
            <span>{person.number}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App