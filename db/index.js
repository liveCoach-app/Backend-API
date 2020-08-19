const mongoose = require('mongoose')

const Annotation = require('./models/annotation.js')
const Session = require('./models/session.js')
const { DB_HOST, DB_PORT, DB_NAME } = process.env

const connectDb = () => {
  return mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const models = { Annotation, Session }

module.exports = { models, connectDb }

