const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
// const dota = require('./schema/dota-schema')
const bodyParser = require('body-parser')
const postgres = require('./postgres');
const models = require('./postgres/models');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP( (req, res) => ({
  schema: schema,
  graphiql: true,
  context: { req, res, models },
})));

postgres
  .sync()
  .then(() => {
    console.log(
      'The postgres server is up and running - maybe you should go catch it!'
    )
    app.listen(4000, () => {
      console.log('now listening on port 4000')
    })
  })
  .catch(console.error)
