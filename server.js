const WebSocket = require('ws')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const  { models, connectDb } = require('./db/index.js')

app.use((req, res, next) => {
  req.context = { models };
  next();
});

app.use(express.json())

app.post('/sessions', (req, res) => {
  req.context.models.Session.create({}, function (err, session) {
    if (err) {
      return res.send({ errors: ['Cannot initialize a new session'] });
    }

    res.json({ data: { id: session._id } })
  });
})

app.post('/annotations', (req, res) => {
  req.context.models.Annotation.create({
    ...req.body,
    // TODO - validate for existing Session
    session: mongoose.Types.ObjectId(req.body.session)
  }, function (err, annotation) {
    if (err) {
      return res.send({ errors: [err.toString()] });
    }

    res.send({ data: annotation })
  });
})


connectDb().then(async () => {
  app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
  );
})

// This will be hosted on the production server
// Will server a ws server to ws://localhost:8080/
// TODO: WIP
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});