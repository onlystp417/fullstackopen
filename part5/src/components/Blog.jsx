const Blog = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    <ul>
      {
        blogs.map(blog => (
          <li key={ blog.id }>
            { blog.title } | by { blog.userId }
          </li>
        ))
      }
    </ul>
  </div>  
)

export default Blog