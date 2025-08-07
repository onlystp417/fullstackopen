import { useState } from 'react'
import PropTypes from 'prop-types'
import { useLogin } from '../contexts/authContext'
import { useNavigate } from 'react-router'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const login = useLogin()

  const handleLogin = e => {
    e.preventDefault()
    login({ password, userName })
    setUserName('')
    setPassword('')
    navigate('/')
  }

  return (
    <form onSubmit={ handleLogin }>
      <h2>Login</h2>
      <div>
        <span>User Name: </span>
        <input
          name="userName"
          type="text"
          value={ userName }
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        <span>Password: </span>
        <input
          name="password"
          type="password"
          value={ password }
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login