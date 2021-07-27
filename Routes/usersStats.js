const express = require('express');
const router = express.Router();

const functions = require('../helper_funcs');

router.use((req, res, next) => {
  console.log('Users route');
  next();
});

// Output:
// Num of requests
// Num of impressions
// Num of clicks
// Average price for bid (include only wins)
// Median Impression duration
// Max time passed till click
router.get('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;

    let requestsMap = functions.requestsData();
    let user_id_map = requestsMap[user_id];

    if (user_id_map != null) {
      let numOfRequests = user_id_map.length;
      let numOfImpressions = 0;
      let numOfClicks = 0;

      let clicksMap = functions.clicksData();
      let impressionMap = functions.impressionsData();

      //Median Impression duration
      let duration_array = [];
      let max_time_until_click = -1 * Infinity;
      // Num of impressions
      // Num of clicks
      for (i = 0; i < user_id_map.length; i++) {
        let session_id = user_id_map[i].SessionId;
        if (clicksMap[session_id] != null) {
          numOfClicks = numOfClicks + clicksMap[session_id].length;
        }

        if (impressionMap[session_id] != null) {
          numOfImpressions =
            numOfImpressions + impressionMap[session_id].length;
        }

        if (impressionMap[session_id] != null) {
          let impression_per_sessionId = impressionMap[session_id];
          for (j = 0; j < impression_per_sessionId.length; j++) {
            duration_array.push(impression_per_sessionId[j].Duration);
          }
        }

        if (clicksMap[session_id] != null) {
          let clicks_per_sessionId = clicksMap[session_id];
          for (k = 0; k < clicks_per_sessionId.length; k++) {
            if (
              parseFloat(clicks_per_sessionId[k].Time) > max_time_until_click
            ) {
              max_time_until_click = parseFloat(clicks_per_sessionId[k].Time);
            }
          }
        }
      }

      let median_duration = functions.median(duration_array);

      //Average price for bid (include only wins)
      let sum_price = 0;
      let count_win_only = 0;

      for (k = 0; k < user_id_map.length; k++) {
        if (user_id_map[k].win == 'TRUE') {
          sum_price = sum_price + parseFloat(user_id_map[k].bid);
          count_win_only++;
        }
      }

      let averagePrice = sum_price / count_win_only;

      let output = {
        numOfRequests: numOfRequests,
        numOfClicks: numOfClicks,
        numOfImpressions: numOfImpressions,
        averagePrice: averagePrice,
        medianDuration: median_duration,
        maxTimePassedTillClick: max_time_until_click,
      };
      res.send(output);
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: err.message || 'bad', status: err.status });
  }
});

module.exports = router;
