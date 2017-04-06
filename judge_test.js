var Judge = require("./Judge.js");

var path=__dirname+"/";

var code = `#include<iostream>
            using namespace std;
            int fib(int x) {
              if (x <= 1) {
                return x;
              } else {
                return fib(x-1)+fib(x-2);
              }
            }
            int main()
            {
              int x, f=1;
              while(cin>>x) {
                if(f) f=0;
                else cout << "\\n\\n";
                cout << fib(x);
              }
              return 0;
            }`

var judge = new Judge(path, "test/t", "cpp", "c0001", code);
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
