import { useState } from 'react'
import Persons from './components/Persons'
import PersonFrom from './components/PersonFrom'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '480-329-3176' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyowrd={keyword} onSetKeyword={setKeyword} />
      <h2>Add a new</h2>
      <PersonFrom
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        onSetPersons={setPersons}
        onSetNewName={setNewName}
        onSetNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} keyword={keyword}/>
    </div>
  )
}

export default App