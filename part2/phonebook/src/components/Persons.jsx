import React from 'react'

function Persons({ persons, keyword }) {
  function shownList() {
    if(keyword === '')
      return persons
    return persons.filter(person => person.name.toLowerCase().includes(keyword))
  }

  return (
    // <pre>{ persons }</pre>
    <ul>
      {shownList().map((person) => (
        <li key={ person.id }>
          {/* {JSON.stringify(person)} */}
          <span>{person?.name}</span>
          <span> / </span>
          <span>{person.number}</span>
        </li>
      ))}
    </ul>
  )
}

export default Persons