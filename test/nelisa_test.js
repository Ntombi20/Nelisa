var assert = require("assert");

describe("Should read the files for each week", function(){

    it('Should read the records for week one', function(){

      var Products = require("../products");
      var week1 = new Products('./files/week1.csv');
        week1.readRecords(function(err, week1){
        assert.deepEqual([45], week1);
        });

    });

});
