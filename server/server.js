const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const { response } = require('express');

const app = express();
const PORT = 5000;
const Pool = pg.Pool;
const pool = new Pool({
  database: 'apis_sql_intro',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('Postgres Connected!!!!');
});

pool.on('error', (error) => {
  console.log('Postgres Error!!!!', error);
});

//
// APP CONFIGURATION
// --------------------

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define the location for static assets to be served from
app.use(express.static('server/public'));

//
// ROUTES
// --------------------
app.get('/api/music', (req, res) => {
  const queryText = `SELECT * FROM "songs";`;

  pool.query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});


//
// APP LAUNCH
// --------------------

app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
