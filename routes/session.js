module.exports = function(app) {
  app.get('/sessions/:id', (req, res) => {
    req.context.models.Session.findOne({ _id: req.params.id}, function (err, session) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: session })
    });
  })

  app.post('/sessions', (req, res) => {
    req.context.models.Session.create({}, function (err, session) {
      if (err) {
        return res.send({ errors: [[err.toString()]] });
      }

      res.json({ data: { id: session._id } })
    });
  })
}

