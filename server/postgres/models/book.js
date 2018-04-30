const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  name: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  }
})

module.exports = Book
