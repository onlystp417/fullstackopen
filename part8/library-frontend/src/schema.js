import { gql } from '@apollo/client'

export const ME = gql`
query {
  me {
    id
    username
    token
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    born
    name
    id
    bookCount
  }
}`

export const ALL_BOOKS = gql`
query{
  allBooks {
    title
    author {
      id
      name
      born
    }
    published
  }
}`

export const CREATE_BOOK = gql`
mutation createBook( $title: String!, $author: String!, $published: Int!, $genres:[String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      id
      name
    }
    published
    genres
  }
}`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($id: ID!, $born: Int!) {
  editAuthor(id: $id, born: $born) {
    id
    name
    born
  }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`
