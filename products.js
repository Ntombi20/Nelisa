module.exports = function(filePath){

var fs = require('fs');

this.readRecords = function(callback){
    var week1Products = [];
    var readFile = fs.readFileSync(filePath, "utf8");

    var week1 = readFile.split('\n');
    console.log(week1[1]);

}
};
