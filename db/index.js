const mongoose = require('mongoose');

const Annotation = require('./models/annotation.js');
const Session = require('./models/session.js');

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/lol');
};

const models = { Annotation, Session };

module.exports = { models, connectDb };

