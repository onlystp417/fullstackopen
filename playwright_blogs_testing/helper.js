const initialUser = {
  name: 'GengBai Lin',
  userName: 'elingeng',
  password: 'asabulu8877'
}

const initData = async (req) => {
  await req.post('http://localhost:3001/api/testing/reset')
  await req.post('http://localhost:3001/api/users', {
    data: initialUser
  })
}

const login = async(page) => {
  const { userName, password, name } = initialUser
  await page.getByRole('textbox').first().fill(userName)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'Login' }).click()

  return name
}

const addBlog = async(page, payload) => {
  await page.getByRole('button', { name: 'Add blog' }).click()
  await page.getByText('Title: ').locator('..').getByRole('textbox').fill('New Blog 1')
  await page.getByText('Author: ').locator('..').getByRole('textbox').fill('GengBai Lin')
  await page.getByText('URL: ').locator('..').getByRole('textbox').fill('medium.com/new_blog_1')
  await page.getByRole('button', { name: 'Create' }).click()
}

module.exports = {
  initialUser,
  initData,
  login,
  addBlog
}