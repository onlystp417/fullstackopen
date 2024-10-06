import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')

  function handleAdd(e) {
    let nameExist = false
    e.preventDefault()

    // check if newName is empty string
    if(newName === '')
      return

    // check if name is exist
    nameExist = persons.findIndex(person => person.name === newName) >= 0 
    if(nameExist) {
      alert(`${ newName } is already added to phonebook.`)
      return
    }

    // add name to the phonebook
    setPersons(persons.concat({
      name: newName.trim(),
      id: persons.length
    }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={ person.id }>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App