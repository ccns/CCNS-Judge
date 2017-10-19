var fs = require('fs-extra');
var exec = require('child_process').exec;

var compilers = require('./compilers');
var problems = require('../model/Problems')

/**
 * @Constructor
 * @variable Judge
 * @description This constructor is store all needed variable for initializing and executing
 * @param {String} path: The current working directory
 * @param {String} folder: The name of temp folder for each judge
 * @param {String} language: The language of judgement
 * @param {String} question_no: The question number
 * @param {String} code: The code body
 */
var Judge = function(path, folder, language, qid, code)
{
  this.path = path;
  this.folder = folder;
  this.language = language;
  this.qid = qid;
  this.code = code;
}

/**
 * @function
 * @name Judge.init
 * @description Initialize the judgement enviroment
 * @param {Function pointer} success
 */
Judge.prototype.init = function(success)
{
  var self = this;

  // Init code
  var code = this.code;

  // Init question data
  var qid = this.qid;
  problems.getProblem(qid, function(err, result) {
    if(result.rowCount) {
      var problem = result.rows[0];
      var input = problem.input;
      var output = problem.output;
      var timeout = problem.timeout;

      // Init compiler
      var lang = self.language;
      var compiler = compilers[lang];

      // Preparing files
      var folder = self.folder;
      var path = self.path;
      fs.mkdirSync(folder);

      fs.copySync('judge/payload/judge.sh', folder+'/judge.sh')

      fs.writeFileSync(folder+'/'+compiler.filename, self.code);

      fs.writeFileSync(folder+'/input', input);
      fs.writeFileSync(folder+'/output', output);

      fs.chmodSync(folder, 0755);
      fs.chmodSync(folder+'/judge.sh', 0755);

      // Build docker command
      var docker_cmd = "docker run -v "+path+folder+":/usr/code -w /usr/code "+compiler.container+" ./judge.sh "+compiler.compiler+" "+compiler.filename+" "+compiler.exec_cmd+" "+timeout

      // Save to member variable
      self.compiler = compiler;
      self.docker_cmd = docker_cmd;

      // Callback
      return success();
    }
  })
}

/**
 * @function
 * @name Judge.judge
 * @description Run docker command for judgement
 * @param {Function pointer} success
 */
Judge.prototype.judge = function(success)
{
  var folder = this.folder;
  var docker_cmd = this.docker_cmd;
  exec(docker_cmd, function(err, stdout, stderr){
    fs.removeSync(folder);
    return success(err, stdout, stderr);
  })
}

module.exports = Judge;
