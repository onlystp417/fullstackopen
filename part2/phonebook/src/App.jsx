import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    console.log(e)
    if(newName === '')
      return
    setPersons(persons.concat({
      name: newName,
      id: persons.length
    }))
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