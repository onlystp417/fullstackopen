import React from 'react'
import personService from '../service/person'

function PersonFrom({
  persons,
  newName,
  newNumber,
  onSetNewName,
  onSetNewNumber,
  onSetPersons,
  onSetAlerMessage }) {
  
  function handleAdd(e) {
    
    e.preventDefault()

    // check if newName is empty string
    if(newName === '' || newNumber === '') {
      alert('Make sure to fill out all the fields.')
      return
    }

    // check if name is exist
    if(checkDuplicated()) return

    // add name to the phonebook
    personService.create({
      name: newName.trim(),
      number: newNumber.trim()
    }).then(res => onSetPersons(persons.concat(res)))
      .then(() => {
        onSetAlerMessage({
          type: 'success',
          msg: `Added ${newName.trim()}`})
        resetAlert()
      })
      .catch(err => {
        onSetAlerMessage({
          type: 'error',
          msg: err
        })
        resetAlert()
      })

    onSetNewName('')
    onSetNewNumber('')
  }

  function handleUpdate(uptPerson) {
    console.log('nnn')
    const msg = `${uptPerson.name} is already added to phonebook, replace the old number with a new one?`

    if(window.confirm(msg)) {
      personService.update(uptPerson.id, uptPerson)
        .then(res => onSetPersons(persons.map(person => person.id === uptPerson.id ? res : person)))
        .then(() => {
          onSetAlerMessage({
            type: 'success',
            msg: `Changed number to ${uptPerson.number}`
          })
          resetAlert()
        })
        .catch(err => {
          console.log(err)
          onSetAlerMessage({
            type: 'error',
            msg: err.error
          })
        })
    }
  }

  function checkDuplicated() {
    let nameIndex = -1
    let numberIndex = -1

    nameIndex = persons.findIndex(person => person.name === newName)
    numberIndex = persons.findIndex(person => person.number === newNumber)
    
    if (numberIndex >= 0 && nameIndex !== numberIndex) {
      alert(`${ newNumber } is been taken.`)
      return true
    } else if(nameIndex >= 0 && nameIndex !== numberIndex) {
      const existPerson = persons.find(person => person.name === newName)
      handleUpdate({
        ...existPerson,
        number: newNumber.trim()
      })
      return true
    } else if(nameIndex >= 0 && nameIndex === numberIndex){
      alert(`${ newName } is already added to phonebook.`)
      return true
    }
  }

  function resetAlert() {
    setTimeout(() => {
      onSetAlerMessage({ type: '', msg: '' })
    }, 3000)
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