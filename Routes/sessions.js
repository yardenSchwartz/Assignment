const express = require('express');
const router = express.Router();

// const foo = require('./index.js');
// const bar = require('./module/path');
const functions = require('../helper_funcs');

// const search_functions = require("../modules/search_recipes");

router.use((req, res, next) => {
  console.log('Sessions route');
  next();
});

//output-
//begin: request timestamp (min_timeStamp(sessonId))
//finish: latest timsetamp (max_timeStamp(sessonId))
//partner name
router.get('/:session_id', async (req, res, next) => {
  try {
    //   if (req.params.user_id != null) {
    //     req.params.num = 5;
    //   }

    const { session_id } = req.params;
    var min_time = Infinity;
    var max_time = Math.log(0);
    let partner_name = '';
    // console.log('min time:', min_time);
    // console.log('max time:', max_time);
    // console.log('partner name is:', partner_name);

    let clicks_data = functions.clicksData();
    let clicks_per_sessionId = clicks_data[session_id];
    if (clicks_per_sessionId != null) {
      for (i = 0; i < clicks_per_sessionId.length; i++) {
        if (clicks_per_sessionId[i].TimeStamp < min_time) {
          min_time = clicks_per_sessionId[i].TimeStamp;
        }

        if (clicks_per_sessionId[i].TimeStamp > max_time) {
          max_time = clicks_per_sessionId[i].TimeStamp;
        }
      }
    }

    let impressions_data = functions.impressionsData();
    let impression_per_sessionId = impressions_data[session_id];
    if (impression_per_sessionId != null) {
      for (i = 0; i < impression_per_sessionId.length; i++) {
        if (impression_per_sessionId[i].TimeStamp < min_time) {
          min_time = impression_per_sessionId[i].TimeStamp;
        }

        if (impression_per_sessionId[i].TimeStamp > max_time) {
          max_time = impression_per_sessionId[i].TimeStamp;
        }
      }
    }

    let requests_data = functions.requestsDataBySessionId();
    let requests_per_sessionId = requests_data[session_id];
    if (requests_per_sessionId != null) {
      for (i = 0; i < requests_per_sessionId.length; i++) {
        partner_name = requests_per_sessionId[i].Partner;

        if (requests_per_sessionId[i].TimeStamp < min_time) {
          min_time = requests_per_sessionId[i].TimeStamp;
        }

        if (requests_per_sessionId[i].TimeStamp > max_time) {
          max_time = requests_per_sessionId[i].TimeStamp;
        }
      }
    }

    let output = { begin: min_time, finish: max_time, partner: partner_name };
    res.send(output);
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: err.message || 'bad', status: err.status });
  }
});

module.exports = router;
