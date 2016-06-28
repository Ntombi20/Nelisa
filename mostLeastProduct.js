//The most popular product sold each week;
exports.mostProduct = function(records) {

  var price = 0;
  var mostSold = {};

    for (var products in records) {
      if (records[products] > price) {
        price = records[products];
        mostSold = {
          item: products,
          price: records[products]
        };
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
        leastSold = {
          item: products,
          price: records[products]
        };
      }
    }
    return leastSold;
};
