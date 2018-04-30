import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
// import Heroes from './components/Heroes';
// import Items from './components/Items';
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Books</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
