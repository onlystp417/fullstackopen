import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Test BlogForm component', () => {
  const user = userEvent.setup()

  test('when new a blog, the payload is within right details', async () => {
    const mockHandler = vi.fn()

    render(<BlogForm onCreateBlog={ mockHandler } />)

    const titleInput = screen.getByPlaceholderText('Title...')
    const authorInput = screen.getByPlaceholderText('Author...')
    const urlInput = screen.getByPlaceholderText('URL...')
    const submitBtn = screen.getByText('Create')

    await user.type(titleInput, 'A happy ending')
    await user.type(authorInput, 'Jason Smith')
    await user.type(urlInput, 'medium.com/a_happy_ending')
    await user.click(submitBtn)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith({
      title: 'A happy ending',
      author: 'Jason Smith',
      url: 'medium.com/a_happy_ending'
    })
  })
})