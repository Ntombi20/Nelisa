//The most popular product sold each week;
exports.mostProduct = function(records) {

  var price = 0;
  var mostSold = "";

    for (var products in records) {
      if (records[products] > price) {
        price = records[products];
        mostSold = products;
      }
    }
    return mostSold;
};

//The least popular product sold each week;
exports.leastProduct = function(records) {

  var price = Infinity;
  var leastSold = "";

    for (var products in records) {
      if (records[products] < price) {
        price = records[products];
        leastSold = products;
      }
    }
    return leastSold;
};
