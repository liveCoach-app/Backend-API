const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema();

sessionSchema.pre('remove', function (next) {
  this.model('Annotation').deleteMany({ session: this._id }, next);
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
