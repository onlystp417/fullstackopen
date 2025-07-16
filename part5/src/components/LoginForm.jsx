import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({
    password,
    userName,
    onSetPassword,
    onSetUserName,
    onSetUser }) => {

  const handleLogin = async e => {
    e.preventDefault()

    if(!password || !userName)
      alert('User name and Password needed.')

    try {
      const data = await loginService.login({ password, userName })
      onSetUser(data) 
      onSetUserName('')
      onSetPassword('')
    } catch(exception) {
      alert(exception)
    }
  }

  return (
    <form onSubmit={ handleLogin }>
      <h2>Login</h2>
      <div>
        <span>User Name: </span>
        <input
          name="userName"
          type="text"
          onChange={({ target }) => onSetUserName(target.value)}
        />
      </div>
      <div>
        <span>Password: </span>
        <input
          name="password"
          type="password"
          onChange={({ target }) => onSetPassword(target.value)}
        />
      </div>
      <button type="submit" >Login</button>
    </form>
  )
}

export default LoginForm