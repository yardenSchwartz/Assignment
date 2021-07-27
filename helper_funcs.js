const csv = require('csv-parser');
const fs = require('fs');

function extractData(path) {
  const content = fs.readFileSync(path, 'utf8');
  // console.log(content);

  splits = content.split(/\r?\n/);

  return splits;
}

function clicksData() {
  clicks_array = {};

  let clicks_data = extractData('./data/clicks.csv');
  clicks_data.forEach((row) => {
    a = row.split(',');
    // let temp = {
    //   TimeStamp: a[0],
    //   SessionId: a[1],
    //   Time: a[2],
    // };
    let temp = {
      TimeStamp: a[0],
      Time: a[2],
    };

    var sessionId = a[1];
    if (clicks_array[sessionId] != null) {
      clicks_array[sessionId].push(temp);
    } else {
      clicks_array[sessionId] = new Array();
      clicks_array[sessionId].push(temp);
    }

    // clicks_array[a[1]] = temp;
    // clicks_array.push(temp);
    // console.log(a);
  });

  return clicks_array;
}

function impressionsData() {
  //   impressions_array = [];
  impressions_array = {};

  let impressions_data = extractData('./data/impressions.csv');
  impressions_data.forEach((row) => {
    a = row.split(',');
    let temp = {
      TimeStamp: a[0],
      //   SessionId: a[1],
      Duration: a[2],
    };
    // impressions_array[a[1]] = temp;

    var sessionId = a[1];
    if (impressions_array[sessionId] != null) {
      impressions_array[sessionId].push(temp);
    } else {
      impressions_array[sessionId] = new Array();
      impressions_array[sessionId].push(temp);
    }
    // impressions_array.push(temp);
    // console.log(a);
  });

  return impressions_array;
}

function requestsData() {
  // requests_array = [];
  requests_array = {};

  let requests_data = extractData('./data/requests.csv');
  requests_data.forEach((row) => {
    a = row.split(',');
    let temp = {
      TimeStamp: a[0],
      SessionId: a[1],
      Partner: a[2],
      //   user_id: a[3],
      bid: a[4],
      win: a[5],
    };

    var userId = a[3];
    if (requests_array[userId] != null) {
      requests_array[userId].push(temp);
    } else {
      requests_array[userId] = new Array();
      requests_array[userId].push(temp);
    }
  });

  return requests_array;
}

function requestsDataBySessionId() {
  // requests_array = [];
  let requests_array_BySessionID = {};

  let requests_data = extractData('./data/requests.csv');
  requests_data.forEach((row) => {
    a = row.split(',');
    let temp = {
      TimeStamp: a[0],
      // SessionId: a[1],
      Partner: a[2],
      user_id: a[3],
      bid: a[4],
      win: a[5],
    };

    var userId = a[1];
    if (requests_array_BySessionID[userId] != null) {
      requests_array_BySessionID[userId].push(temp);
    } else {
      requests_array_BySessionID[userId] = new Array();
      requests_array_BySessionID[userId].push(temp);
    }
  });

  return requests_array_BySessionID;
}

function median(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

exports.extractData = extractData;
exports.requestsData = requestsData;
exports.impressionsData = impressionsData;
exports.clicksData = clicksData;
exports.median = median;
exports.requestsDataBySessionId = requestsDataBySessionId;
