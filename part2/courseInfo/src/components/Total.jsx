import { useState } from 'react'

function Total({ content }) {

  function sumUpExcersixes() {
    let sumValue = content.reduce(
      (accu, curr) => accu + curr.exercises
    , 0)

    return sumValue
  }

  return (
    <p><b>Total of {  sumUpExcersixes() } exercises.</b></p>
  )
}

export default Total