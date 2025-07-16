const LoginForm = ({
    password,
    userName,
    onSetPassword,
    onSetUserName,
    onLogin}) => {

  return (
    <form onSubmit={ onLogin }>
      <h2>Login</h2>
      <div>
        <span>User Name: </span>
        <input
          name="userName"
          type="text"
          value={ userName }
          onChange={({ target }) => onSetUserName(target.value)}
        />
      </div>
      <div>
        <span>Password: </span>
        <input
          name="password"
          type="password"
          value={ password }
          onChange={({ target }) => onSetPassword(target.value)}
        />
      </div>
      <button type="submit" >Login</button>
    </form>
  )
}

export default LoginForm