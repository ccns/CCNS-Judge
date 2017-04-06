var fs = require('fs-extra');
var exec = require('child_process').exec;

var compilers = require('./compilers');
var questions = require('./questions');

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
var Judge = function(path, folder, language, question_no, code)
{
  this.path = path;
  this.folder = folder;
  this.language = language;
  this.question_no = question_no;
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
  // Init code
  var code = this.code;

  // Init question data
  var q_no = this.question_no;
  var input = questions[q_no].input;
  var output = questions[q_no].output;

  // Init compiler
  var lang = this.language;
  var compiler = compilers[lang];

  // Preparing files
  var folder = this.folder;
  var path = this.path;
  fs.mkdirSync(folder);

  fs.copySync('payload/exec.sh', folder+'/exec.sh')

  fs.writeFileSync(folder+'/'+compiler.filename, this.code);

  fs.writeFileSync(folder+'/input', input);
  fs.writeFileSync(folder+'/output', output);

  fs.chmodSync(folder, 0755);
  fs.chmodSync(folder+'/exec.sh', 0755);

  // Build docker command
  var docker_cmd = "docker run -v "+path+folder+":/usr/code -w /usr/code "+compiler.container+" ./exec.sh "+compiler.compiler+" "+compiler.filename+" "+compiler.exec_cmd
  console.log(docker_cmd);

  // Save to member variable
  this.compiler = compiler;
  this.docker_cmd = docker_cmd;

  // Callback
  return success();
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
