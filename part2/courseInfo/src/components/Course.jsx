import React from 'react'
import Header from './Header'
import Content from './Content'

function Course({ course }) {
  return (
    <>
      <Header title={course.name}/>
      <Content content={course.parts}/>
    </>
  )
}

export default Course