const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const AnnotationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  drawings: {
    type: mongoose.Schema.Types.Object,
  },
})

AnnotationSchema.plugin(idValidator)

const Annotation = mongoose.model('Annotation', AnnotationSchema)

module.exports = Annotation
