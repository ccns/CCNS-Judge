var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var Judge = require('./judge/Judge');

app.use(express.static(__dirname));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}

app.post('/judge', function(req, res)
{
  var code = req.body.code;
  var language = req.body.language;
  var question_no = req.body.question_no;
  var user_id = req.body.user_id;
  var team_id = req.body.team_id;
  var contest_id = req.body.contest_id;

  var folder= 'judge/temp/' + random(10);
  var path=__dirname+"/";

  var judge = new Judge(path, folder, language, question_no, code);

  judge.init(function(){
    judge.judge(function(err, stdout, stderr){
      res.send({stdout: stdout, stderr: stderr});
    })
  });

});

console.log("Listening at "+port)
app.listen(port);
