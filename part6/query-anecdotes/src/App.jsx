import { useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdote'

const App = () => {
  const NotificationRef = useRef()
  const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(ane => {
        console.log(newAnecdote)
        return ane.id === newAnecdote.id ? newAnecdote : ane
      }))
    }
  })

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  const handleNotify = msg => {
    NotificationRef.current.onSetMsg(msg)
    setTimeout(() => {
      NotificationRef.current.onSetMsg('')
    }, 2000)
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

  if(updateAnecdoteMutation.isError) {
    handleNotify(updateAnecdoteMutation.error.response.data.error)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification ref={NotificationRef} />
      <AnecdoteForm onHandleNotify={handleNotify} />
    
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
