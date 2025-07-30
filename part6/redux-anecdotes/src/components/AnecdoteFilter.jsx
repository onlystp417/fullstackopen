import { useRef } from 'react'
import PropTypes from 'prop-types'

const AnecdoteFilter = ({ onFilter }) => {
  const keyword = useRef('') // useRef prevent re-rendering on keyword updates

  const handleFilter = e => {
    console.log(e.target.value)
    keyword.current = e.target.value
    onFilter(keyword.current)
  }

  const restKeyword = () => {
    keyword.current = ''
    onFilter(keyword.current)
  }

  return (
    <div>
      <span>Filter: </span>
      <input
        type="text"
        name="keyword"
        value={ keyword.current }
        onChange={ handleFilter }
      />
      <button onClick={ restKeyword }>X</button>
    </div>
  )
}

AnecdoteFilter.propTypes = {
  onFilter: PropTypes.func
}

export default AnecdoteFilter