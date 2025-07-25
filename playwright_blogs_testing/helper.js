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

module.exports = {
  initialUser,
  initData,
  login
}