import React from 'react'

function Filter({ keyowrd, onSetKeyword }) {
  return (
    <div>
      Filter shown with 
      <input value={keyowrd} onChange={event => onSetKeyword(event.target.value)} />
    </div>
  )
}

export default Filter