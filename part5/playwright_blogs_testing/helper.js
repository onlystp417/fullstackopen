const initialUser = {
  name: 'GengBai Lin',
  userName: 'elingeng',
  password: 'asabulu8877'
}

const initialBlog = {
  title: 'New Blog 1',
  author: 'GengBai Lin',
  url: 'blogs/1'
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
  const { title, author, url } = payload
  await page.getByText('Title: ').locator('..').getByRole('textbox').fill(title)
  await page.getByText('Author: ').locator('..').getByRole('textbox').fill(author)
  await page.getByText('URL: ').locator('..').getByRole('textbox').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()

  // 等待 blog 出現在列表中，再繼續（假設用 title 判斷是否新增成功）
  await page.waitForSelector(`text=${title}` , { timeout: 500 })
}

module.exports = {
  initialUser,
  initialBlog,
  initData,
  login,
  addBlog
}