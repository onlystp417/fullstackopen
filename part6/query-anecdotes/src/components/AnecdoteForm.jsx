import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = ({ onHandleNotify }) => {
  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({
      content: content,
      id: Date.now(),
      votes: 0
    })
  }

  if(anecdoteMutation.isError) {
    onHandleNotify(anecdoteMutation.error.response.data.error)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
