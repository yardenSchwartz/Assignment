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

  // clicks_array = [];
  // impressions_array = [];
  // requests_array = [];

  // let clicks_data = functions.extractData('./data/clicks.csv');
  // clicks_data.forEach((row) => {
  //   a = row.split(',');
  //   let temp = {
  //     TimeStamp: a[0],
  //     SessionId: a[1],
  //     Time: a[2],
  //   };
  //   clicks_array.push(temp);
  //   // console.log(a);
  // });

  // let impressions_data = functions.extractData('./data/impressions.csv');
  // impressions_data.forEach((row) => {
  //   a = row.split(',');
  //   let temp = {
  //     TimeStamp: a[0],
  //     SessionId: a[1],
  //     Duration: a[2],
  //   };
  //   impressions_array.push(temp);
  //   // console.log(a);
  // });

  // let requests_data = functions.extractData('./data/requests.csv');
  // requests_data.forEach((row) => {
  //   a = row.split(',');
  //   let temp = {
  //     TimeStamp: a[0],
  //     SessionId: a[1],
  //     Partner: a[2],
  //     user_id: a[3],
  //     bid: a[4],
  //     win: a[5],
  //   };
  //   requests_array.push(temp);
  // });
});

app.use('/userStats', users);
app.use('/sessionId', sessions);

//not found
app.use((req, res) => {
  res.sendStatus(404);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

process.on('SIGINT', function () {
  if (server) {
    server.close(() => console.log('server closed'));
  }
  process.exit();
});

// module.exports = clicks_array;
