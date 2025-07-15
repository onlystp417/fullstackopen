const initialData = {
  blogs: [
    {
      title: 'How my parents divorced happily',
      url: 'www.mediem.com/kj3j490kdhjsjh',
      likes: 5674
    },
    {
      title: 'The yesterday vibes',
      url: 'www.mediem.com/dklf8923lrkjd',
      likes: 10021
    }
  ],
  users: [
    {
      "userName": "root",
      "name": "defaultUser",
      "password": "goHell7788"
    }
  ]
}

const dataInitialize = async (model, dataName) => {
    await model.deleteMany({})
    await model.insertMany(initialData[dataName])
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