require("../lib/index")(__dirname,"..","..");

//let p= new Promise<void>((_,reject)=> reject(new Error("My error")));

(async ()=>{

    throw new Error("my error");

})();