import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../schema'

const LoginForm = ({ onSetPage, onSetUser, show }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login ] = useMutation(LOGIN)

  if (!show) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await login({ variables: { username, password } })
      const loggedInUser = {
        username,
        token: data?.login?.token
      }
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      resetForm()
      onSetUser(loggedInUser)
      onSetPage('authors')
    } catch(error) {
      console.log(error)
    }
  }

  function resetForm () {
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm