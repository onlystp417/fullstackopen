import { useState } from 'react'

function Total({ content }) {

  function sumUpExcersixes() {
    let sumValue = 0;
    for(let i=0; i<content.length; i++) {
      sumValue += content[i].exercises
    }
    return sumValue
  }

  return (
    <p>Total of {  sumUpExcersixes() } exercises.</p>
  )
}

export default Total