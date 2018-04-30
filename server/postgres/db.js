const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/ninja', {
  logging: false,
  operatorsAliases: false
})

module.exports = db
