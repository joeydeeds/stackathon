import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getHeroesQuery } from '../queries/queries';

class Heroes extends Component {
  displayHeroes() {
    const data = this.props.data
    if (data.loading) {
      return <div>Loading heroes...</div>
    } else {
      return data.heroes.map(hero => {
        return <li key={hero.id}>{hero.name}</li>
      })
    }
  }

  render() {
    return (
      <div>
        <ul>{this.displayHeroes()}</ul>
      </div>
    )
  }
}

export default graphql(getHeroesQuery)(Heroes)
