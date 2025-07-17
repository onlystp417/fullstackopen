import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const hide = { display : 'none' }
  const show = { display: 'block' }
  const blogStyle = { border: 'solid #a4bfab', padding: '10px', margin: '0 0 5px 0' }
  const header = { display: 'flex', justifyContent: 'space-between', width: '600px' }
  const content = { backgroundColor: '#bed2c3ff', padding: '15px', margin: '5px 0' }
  const likeStyle= { border: 'none', backgroundColor: 'inherit', marginLeft: '5px', cursor: 'pointer' }

  const hanbleVisibility = () => { setShowDetail(!showDetail) }

  return (
    <div style={ blogStyle }>
      <div style={ header }>
        { blog.title }
        <button onClick={ hanbleVisibility }>{ showDetail ? 'hide' : 'view' }</button>
      </div>
      <ul style={{ ...(showDetail ? show : hide), ...content }}>
        <li>Author: { blog.author }</li>
        <li>
          Likes: { blog.likes }
          <button style={ likeStyle }>👍</button>
        </li>
        <li>URL: { blog.url }</li>
        <p>{ blog.user.name }</p>
      </ul>
    </div>
  )
}

export default Blog