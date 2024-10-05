import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

function Course({ course }) {
  return (
    <>
      <Header title={course.name}/>
      <Content content={course.parts}/>
      <Total content={course.parts}/>
    </>
  )
}

export default Course