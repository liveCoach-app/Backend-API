const express = require('express')
const sessionRoute = require('./session')
const annotationRoute = require('./annotation')

module.exports = function(app){
  app.use(express.json())

  sessionRoute(app)
  annotationRoute(app)
}


