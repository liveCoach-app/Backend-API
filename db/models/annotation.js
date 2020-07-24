const mongoose = require('mongoose')

const annotationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
})


const Annotation = mongoose.model('Annotation', annotationSchema)

module.exports = Annotation