const Sequelize = require('sequelize')
const db = require('../db')

const Hero = db.define('heroes', {
  name: {
    type: Sequelize.STRING
  },
  attackType: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  attribute: {
    type: Sequelize.STRING
  },
})

module.exports = Hero
