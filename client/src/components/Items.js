import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getItemsQuery } from '../queries/queries';

class Items extends Component {
  displayItems() {
    const data = this.props.data
    if (data.loading) {
      return <div>Loading items...</div>
    } else {
      return data.items.map(item => {
        return <li key={item.id}>{item.name}</li>
      })
    }
  }

  render() {
    return (
      <div>
        <ul>{this.displayItems()}</ul>
      </div>
    )
  }
}

export default graphql(getItemsQuery)(Items)
