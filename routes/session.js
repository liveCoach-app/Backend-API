module.exports = function(app) {
  app.get('/sessions', (req, res) => {
    req.context.models.Session.find({}, function (err, sessions) {
      if (err) {
        return res.send({ errors: [err.toString()] });
      }

      res.send({ data: sessions })
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

