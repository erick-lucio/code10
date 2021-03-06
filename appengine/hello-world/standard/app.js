/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


'use strict';
// [START gae_node_request_example]
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');


app.use(cors());
const connection = mysql.createPool({
  host     : '35.198.26.170', // Your connection adress (localhost).
  user     : 'arduino',     // Your database's username.
  password : 'erickgostoso',        // Your database's password.
  database : 'banco1'   // Your database's name.
});


app.get('/', (req, res) => {
 connection.getConnection(function (err, connection) {

    // Executing the MySQL query 
    connection.query('select temp from temperature where  data = (select max(data) from temperature)', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
     // res.status(200).send('Hello, world!');
    });
  });
    
  
 
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
