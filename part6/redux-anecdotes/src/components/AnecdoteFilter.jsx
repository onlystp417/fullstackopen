import { useState } from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('') // useRef prevent re-rendering on keyword updates

  const handleFilter = e => {
    setKeyword(e.target.value)
    dispatch(filterAnecdotes(keyword))
  }

  const restKeyword = () => {
    setKeyword('')
    dispatch(filterAnecdotes(''))
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