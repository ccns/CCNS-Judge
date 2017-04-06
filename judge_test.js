var Judge = require("./Judge.js");

var path=__dirname+"/";

var code = `#include<iostream>
            #include<string>
            using namespace std;
            int main()
            {
              string s;
              getline(cin, s);
              cout << "Hello " << s << "!" << endl;
            }`

var judge = new Judge(path, "test", "cpp", "c8763", code);
judge.init(function(){
  judge.judge(function(err, stdout, stderr){
    console.log("ERR:");
    console.log(err);
    console.log("STDOUT:");
    console.log(stdout);
    console.log("STDERR:");
    console.log(stderr);
  })
})
