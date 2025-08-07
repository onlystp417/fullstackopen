import { useLocation } from 'react-router'

const User = () => {
  const { state: user } = useLocation()
  return (
    <>
      <h3>{ user.name }</h3>
      <h4>Added blogs:</h4>
      <ul>
        { user.blogs.map(blog => (
          <li key={blog.id}>{ blog.title }</li>
        )) }
      </ul>
    </>
  )
}

export default User