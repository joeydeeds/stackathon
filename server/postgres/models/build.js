const Sequelize = require('sequelize')
const db = require('../db')

const Build = db.define('build', {
  time: {
    type: Sequelize.INTEGER
  },
  itemName: {
    type: Sequelize.INTEGER
  }
})

module.exports = Build
