import { Link } from 'react-router'
import style from '../styles/header.module.sass'

const Header = ({ auth, logout }) => {
  const gutter = {
    marginLeft: '10px'
  }

  const dFlex = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <header className={style.header}>
      <div className={style.menu}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>
      <p>
        { `${auth?.name} logged in ` }
        <button onClick={ logout }>Logout</button>
      </p>
    </header>
  )
}

export default Header