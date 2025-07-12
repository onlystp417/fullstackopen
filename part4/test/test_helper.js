const { beforeEach } = require('node:test')

const initialData = {
  'blogs': [
    {
      title: 'How my parents divorced happily',
      author: 'John Corner',
      url: 'www.mediem.com/kj3j490kdhjsjh',
      likes: 5674
    },
    {
      title: 'The yesterday vibes',
      author: 'King Lee',
      url: 'www.mediem.com/dklf8923lrkjd',
      likes: 10021
    }
  ],
  users: [
    {
      "userName": "root",
      "name": "defaultUser",
      "passwordHash": "$2b$10$YhnzMV.ObXvg/EtCn7HC6Oz6Za1Bs/KaSS5O8kK25SdnmkeUbr0e2"
    }
  ]
}

const dataInitialize = (model, dataName) => {
  beforeEach(async () => {
    await model.deleteMany({})
    await model.insertMany(initialData[dataName])
  })
}

const dataInDb = async (model) => {
  const data = await model.find({})
  return data.map(item => item.toJSON())
}


module.exports = {
  initialData,
  dataInitialize,
  dataInDb
}