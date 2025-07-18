import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test Blog element', () => {
  const blog = {
    id: 'blog1',
    title: 'Happy ever after',
    auther: 'Jin Hsieh',
    url: 'www.medium.com/happy_ever_after',
    likes: 0,
    user: { name: 'GB Lin' }
  }

  const { container } = render(
    <Blog blog={blog} onUpdateBlog={() => {}} onRemoveBlog={() => {}} />
  )

  test('render blog', () => {
    const element = container.querySelector('#blog1')

    expect(element).toHaveTextContent('Happy ever after')
  })

  test('clicking view-button shows likes and url info"', () => {
    let likesElement = screen.queryByTestId('blog-likes')
    let urlElement = screen.queryByTestId('blog-url')

    expect(likesElement).toBeNull()
    expect(urlElement).toBeNull()

    const viewBtn = screen.queryByTestId('view-btn')
    const user = userEvent.setup()
    user.click(viewBtn)

    likesElement = screen.queryByTestId('blog-likes')
    urlElement = screen.queryByTestId('blog-url')

    expect(likesElement).toBeDefined()
    expect(urlElement).toBeDefined()
  })
})