import React from 'react'

function PersonFrom({ persons, newName, newNumber, onSetNewName, onSetNewNumber, onSetPersons }) {
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
    onSetPersons(persons.concat({
      id: persons.length,
      name: newName.trim(),
      number: newNumber.trim()
    }))
    onSetNewName('')
    onSetNewNumber('')
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={event => onSetNewName(event.target.value)}/>
      </div>
      <div>
        numbers: <input value={newNumber} onChange={event => onSetNewNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={handleAdd}>add</button>
      </div>
    </form>
  )
}

export default PersonFrom