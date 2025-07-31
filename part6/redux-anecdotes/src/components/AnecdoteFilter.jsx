import { useState } from 'react'
import PropTypes from 'prop-types'

const AnecdoteFilter = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('') // useRef prevent re-rendering on keyword updates

  const handleFilter = e => {
    setKeyword(e.target.value)
    onFilter(keyword)
  }

  const restKeyword = () => {
    setKeyword('')
    onFilter('')
  }

  return (
    <div>
      <span>Filter: </span>
      <input
        type="text"
        name="keyword"
        value={ keyword }
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