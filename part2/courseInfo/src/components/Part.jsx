import React from 'react'

function Part({ part }) {
  // console.log('part', part)
  return (
    <li>
      <span>{ part.name }</span>
      <span>{ part.exercises }</span>
    </li>
  )
}

export default Part