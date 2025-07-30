const AnecdoteList = ({ anecdotes, onVote }) => {
  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList