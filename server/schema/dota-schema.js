const graphql = require('graphql')
const Book = require('../postgres/models/book')
const Author = require('../postgres/models/author')
const Build = require('../postgres/models/build')
const Hero = require('../postgres/models/hero')
const Item = require('../postgres/models/item')

const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      }
    }
  })
})

const BuildType = new GraphQLObjectType({
  name: 'Build',
  fields: () => ({
    id: { type: GraphQLID },
    time: { type: GraphQLInt },
    heroId: { type: GraphQLID },
    itemName: {
      type: new GraphQLList(ItemType),
      resolve(parent, args, context, info) {
        console.log(parent)
        return Build.findAll()
      }
    }
  })
})

const HeroType = new GraphQLObjectType({
  name: 'Hero',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    attackType: { type: GraphQLString },
    attribute: { type: GraphQLString },
    role: { type: GraphQLString }
  })
})

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.findAll()
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.findAll()
      }
    },
    hero: {
      type: HeroType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Hero.findById(args.id)
      }
    },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve(parent, args) {
        return Hero.findAll()
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Item.findById(args.id)
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.findAll()
      }
    },
    build: {
      type: BuildType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Build.find({ where: { heroId: args.id } })
      }
    },
    builds: {
      type: new GraphQLList(BuildType),
      resolve(parent, args) {
        return Build.findAll()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
