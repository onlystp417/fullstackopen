import { useState } from 'react'

function Total({ content }) {

  function sumUpExcersixes() {
    let sumValue = content.reduce(
      (accu, curr) => accu + curr.exercises
    , 0)
    
    return sumValue
  }

  return (
    <p>Total of {  sumUpExcersixes() } exercises.</p>
  )
}

export default Total