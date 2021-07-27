const express = require('express');
var app = express();
// var logger = require('morgan');
const functions = require('./helper_funcs');

var port = 8001;

// app.use(logger('dev')); //logger
app.use(express.json()); // parse application/json

const csv = require('csv-parser');
const fs = require('fs');

const users = require('./Routes/usersStats');
const sessions = require('./Routes/sessions');

app.get('/keepalive', (req, res) => {
  res.send('The service up and ready for query');
});

app.use('/userStats', users);
app.use('/sessionId', sessions);

//not found
app.use((req, res) => {
  res.sendStatus(404);
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

process.on('SIGINT', function () {
  if (server) {
    server.close(() => console.log('server closed'));
  }
  process.exit();
});

// module.exports = clicks_array;
