import { Link } from 'react-router'

const Menu = () => {
  const gutter = {
    marginLeft: '10px'
  }

  return (
    <div>
      <Link style={gutter} to="/">Home</Link>
      <Link style={gutter} to="/users">Users</Link>
    </div>
  )
}

export default Menu