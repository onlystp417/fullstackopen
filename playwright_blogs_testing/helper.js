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

module.exports = {
  initialUser,
  initData
}