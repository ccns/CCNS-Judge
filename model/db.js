const pg = require('pg');

var config = {
  user: 'ccnsjudge',
  database: 'ccnsjudge',
  password: 'ccnsccns',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('error', function(err, client) {
  console.error('idel client error', err.message, err.stack);
})

module.exports.query = function(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
}

module.exports.connect = function(callback) {
  return pool.connect(callback);
}
