import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLogin }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    onLogin({ password, userName })
    setUserName('')
    setPassword('')
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

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginForm