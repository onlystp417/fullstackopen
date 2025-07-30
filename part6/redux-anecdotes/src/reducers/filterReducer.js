const filterReducer = (state = '', action) => {
  const { type, payload } = action

  if(type === 'FILTER') {
    return payload.keyword
  }

  return state
}

export const filterAnecdotes = keyword => ({
  type: 'FILTER',
  payload: { keyword }
})

export default filterReducer