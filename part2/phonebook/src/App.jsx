import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonFrom from './components/PersonFrom'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        // console.log(res)
        setPersons(res.data)
      })
      .catch(err => {
        throw Error(err.message)})
  }, [keyword])
  

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