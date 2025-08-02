import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdote'
import useNotification from '../hooks/useNotification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notification = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: newAnecdote => {
      notification(`Successfully add anecdote: ${newAnecdote.content}`)

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: error => {
      notification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const newAnecdote = {
      content: event.target.anecdote.value,
      id: Date.now(),
      votes: 0
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(newAnecdote)
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
