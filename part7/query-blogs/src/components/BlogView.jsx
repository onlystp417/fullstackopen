import { useLocation } from 'react-router'

const Blog = () => {
  const { state: blog } = useLocation()

  return (
    <>
      <h2>{ blog.title }</h2>
      <p>{ blog.likes } likes</p>
      <p>Added by <b><i>{ blog.author }</i></b></p>
    </>
  )
}

export default Blog