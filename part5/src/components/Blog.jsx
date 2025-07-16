const Blog = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    <ul>
      {
        blogs.map(blog => (
          <li key={ blog.id }>
            { blog.title } | by { blog.author }
          </li>
        ))
      }
    </ul>
  </div>  
)

export default Blog