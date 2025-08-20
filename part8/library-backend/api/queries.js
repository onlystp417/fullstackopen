const Book = require('../models/Book')
const Author = require('../models/Author')

async function authorCount () {
  return await Author.countDocuments()
}

async function bookCount () {
  return await Book.countDocuments()
}

async function allBooks (root, args) {
  let booksFiltered = await Book.find({})

  if(args.author) {
    booksFiltered = await Book.find({ author: args.author })
  }
  
  if(args.genre) {
    booksFiltered = await Book.find({ genres: { $in: [args.genre] } })
  }

  return booksFiltered.map(async ({ title, author, published, genres }) => {
    const authorObj = await Author.findById(author)
      return {
        title,
        author: authorObj,
        published,
        genres
      }
    }
  )
}

async function allAuthors () {
  const authorsWithBookCount = await Author.aggregate([
    // 階段 1: 聯結 books 集合
    {
      $lookup: {
        from: 'books', // 聯結的目標集合名稱
        localField: '_id', // 本地（作者）模型中的欄位
        foreignField: 'author', // 遠端（書籍）模型中的欄位
        as: 'authoredBooks', // 將符合條件的書籍存入這個陣列
      },
    },
    // 階段 2: 選擇需要回傳的欄位並計算書籍數量
    {
      $project: {
        name: '$name', // 保留作者的名稱
        born: '$born', // 保留作者的出生年份
        bookCount: { $size: '$authoredBooks' }, // 計算 authoredBooks 陣列的大小
      },
    },
  ]);

  return authorsWithBookCount;
}

module.exports = {
  authorCount,
  bookCount,
  allBooks,
  allAuthors
}