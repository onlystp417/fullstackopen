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

  const user = userEvent.setup()

  test('render blog', () => {
    const { container } = render(
      <Blog blog={blog} onUpdateBlog={() => {}} onRemoveBlog={() => {}} />
    )
    const element = container.querySelector('#blog1')
    expect(element).toHaveTextContent('Happy ever after')
  })

  test('clicking view-button shows likes and url info"', async () => {
    render(
      <Blog blog={blog} onUpdateBlog={() => {}} onRemoveBlog={() => {}} />
    )

    let blogDetail = screen.queryByTestId('detail')

    expect(blogDetail).toHaveStyle('display: none')

    const viewBtn = screen.getByText('view')

    await user.click(viewBtn)

    blogDetail = screen.queryByTestId('detail')
    expect(blogDetail).not.toHaveStyle('display: none')
  })

  test('clicking likes twice excuting twice func', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} onUpdateBlog={ mockHandler } onRemoveBlog={() => {}} />
    )

    const viewBtn = screen.queryByTestId('view-btn')
    await user.click(viewBtn)

    const likesBtn = screen.queryByTestId('likes-btn')

    await user.click(likesBtn)
    await user.click(likesBtn)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})