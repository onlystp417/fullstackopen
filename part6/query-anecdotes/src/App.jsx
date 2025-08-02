import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdote'
import useNotification from './hooks/useNotification'

const App = () => {
  const queryClient = useQueryClient()
  const notification = useNotification()

    const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: newAnecdote => {
      notification(`You voted ${newAnecdote.content}`)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(ane => {
        return ane.id === newAnecdote.id ? newAnecdote : ane
      }))
    },
    onError: error => {
      notification(error.response.data.error)
    }
  })

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll
  })

  if(anecdotesQuery.isPending) {
    return <div>Data is loading</div>
  }

  if(anecdotesQuery.isError) {
    return <div>{ anecdoteService.error.message }</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotesQuery.data?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
