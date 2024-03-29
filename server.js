require('dotenv').config()
const express = require('express')
const cors = require('cors')
const  { models, connectDb } = require('./db/index')
const app = express()
const port = process.env.APP_PORT

// Enable All CORS Requests
app.use(cors())

app.use((req, res, next) => {
  req.context = { models }
  next()
})

// Load the routing
require('./routes/index')(app)

// Start the server, when we establish the connection to the DB firstly
connectDb().then(async () => {
  app.listen(port, () =>
    console.log(`App listening on port ${port}!`),
  )
})
