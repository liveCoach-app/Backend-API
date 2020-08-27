const express = require('express')
const sessionRoute = require('./session')
const annotationRoute = require('./annotation')
const lolRoute = require('./lol')

module.exports = function(app){
  app.use(express.json())

  sessionRoute(app)
  annotationRoute(app)
  lolRoute(app)
}


