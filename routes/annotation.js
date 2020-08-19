const mongoose = require('mongoose')

module.exports = function(app) {
  app.get('/annotations', (req, res) => {
    req.context.models.Annotation.find({}, function (err, annotations) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: annotations })
    });
  })

  app.post('/annotations', (req, res) => {
    req.context.models.Annotation.create({
      ...req.body,
      session: mongoose.Types.ObjectId(req.body.session)
    }, function (err, annotation) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: annotation })
    });
  })

  app.put('/annotations/:id', (req, res) => {
    req.context.models.Annotation.update({ _id: req.params.id }, req.body, { multi: false }, function (err, annotation) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: annotation })
    });
  })

  app.delete('/annotations/:id', (req, res) => {
    req.context.models.Annotation.remove({ _id: req.params.id }, function (err, annotation) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: annotation })
    });
  })
}
