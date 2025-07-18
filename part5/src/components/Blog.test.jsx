import { render, screen } from '@testing-library/react'
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
})