import React from 'react'
import perosonService from '../service/person'

function Persons({ persons, onSetPersons, keyword }) {
  function shownList() {
    if(keyword === '')
      return persons
    return persons.filter(person => person.name.toLowerCase().includes(keyword))
  }

  function handleDelete(id, name) {
    if(window.confirm(`Delete ${ name }`)) {
      perosonService.remove(id)
        .then(res => onSetPersons(persons.filter(person => person.id !== res.id)))
    }
  }

  return (
    // <pre>{ persons }</pre>
    <ul>
      {shownList().map((person) => (
        <li key={ person.name }>
          {/* {JSON.stringify(person)} */}
          <span>{person?.name}</span>
          <span> / </span>
          <span>{person.number} </span>
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons