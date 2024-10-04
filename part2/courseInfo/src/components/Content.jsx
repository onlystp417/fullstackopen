import React from 'react'
import Part from './Part'

function Content({ content }) {
  // console.log('content', content)
  return (
    <ul>{ content.map(part => <Part part={part} key={part.id} />) }</ul>
  )
}

export default Content