import { gql } from 'apollo-boost'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getHeroesQuery = gql`
  {
    heroes {
      name
      id
    }
  }
`
const getItemsQuery = gql`
  {
    items {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`
const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getBookQuery = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        books {
          name
          id
        }
      }
    }
  }
`

export {
  getAuthorsQuery,
  getBooksQuery,
  getHeroesQuery,
  getItemsQuery,
  addBookMutation,
  getBookQuery
}
