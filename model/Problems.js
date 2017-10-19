const pool = require('./db');

module.exports.newProblem = function(data, callback) {
  var qid = data.qid;
  var name = data.name;
  var description = data.description;
  var input = data.input;
  var output = data.output;
  pool.query('INSERT INTO problems (qid, name, description, input, output) VALUES ($1, $2, $3, $4, $5)', [qid, name, description, input, output], function(err, res) {
  });
}

module.exports.getProblem = function(qid, callback) {
  pool.query('SELECT * FROM problems WHERE qid = $1', [qid], callback);
}
