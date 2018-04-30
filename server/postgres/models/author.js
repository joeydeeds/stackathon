const Sequelize = require('sequelize')
const db = require('../db')

const Author = db.define('author', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.STRING
  }
})

module.exports = Author
