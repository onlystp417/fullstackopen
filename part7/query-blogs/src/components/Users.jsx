import { Link } from 'react-router'
import { useUsers } from '../hooks/useUsers'

const Users = () => {
  const users = useUsers()
  console.log('users', users)

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td scope="row"><Link to="/">{ user.name }</Link></td>
              <td>{ user.blogs.length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users