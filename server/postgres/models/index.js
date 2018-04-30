const Book = require('./book')
const Author = require('./author')
const Item = require('./item')
const Hero = require('./hero')
const Build = require('./build')

/* Associations go here */
Book.belongsTo(Author)
Author.hasMany(Book)
Build.belongsTo(Hero)

module.exports = {
  Book,
  Author,
  Item,
  Hero,
  Build
}
