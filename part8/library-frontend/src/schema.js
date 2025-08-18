import { gql } from '@apollo/client'

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
    author
    published
  }
}`
