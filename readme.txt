In order to run the api-project you need to run the 'index.js' file.

The route of '/keepalive' doesn't get nothing but return feedback that the service up and ready for query.

There are several separate routes, each of them handle different requests.

1. The first route is 'sessions.js', the request '/sessionId' is being handling here. Gets sessionid and return the following details about the session_id:    * Begin: request timestamp
    * Finishe: latest timestamp
    * partner name
2. The second route is 'usersStats.js', the request '/userStats' is being handeling here. Gets user_id and return the following details about the user:
    * num of requests
    * num of impressions
    * num of click
    * average price for bid (include only wins)
    * median impression duration
    * max time passed till click


Improvements:
My suggestion is to work with DB and build tables similar to the excel files, but add more columns that will hold most of the parameters we want to return from the API requests.
For example: 
    * average price for bid that include only wins
    * median impression duration
    *max time passed till click for each user_id
When we work with the DB, the extracted from it, updating and adding records will be done more easily and quickly.
We will write a query that can calculate and retrieve the relevant records according to the 'user_id'/'session_id'.