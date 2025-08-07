import { Link } from 'react-router'

const Header = ({ auth, logout }) => {
  const gutter = {
    marginLeft: '10px'
  }

  const dFlex = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <header>
      <div>
        <Link style={gutter} to="/">Home</Link>
        <Link style={gutter} to="/users">Users</Link>
      </div>
      <p style={dFlex}>
        { `${auth?.name} logged in ` }
        <button onClick={ logout }>log out</button>
      </p>
    </header>
  )
}

export default Header