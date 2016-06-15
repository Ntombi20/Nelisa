//the most profitable product for each week
exports.mostProfitableProduct = function(data) {

    var cost = 0;
    var mostPProduct = "";

    for (var product in data) {
      if (data[product] > cost) {
        cost = data[product];
        mostPProduct = product;
      }
    }
    return mostPProduct;
};

//the least profitable product for each week
exports.leastProfitableProduct = function(data) {

    var cost = Infinity;
    var leastPProduct = "";

    for (var product in data) {
      if (data[product] < cost) {
        cost = data[product];
        leastPProduct = product;
      }
    }
    console.log(leastPProduct);
    return leastPProduct;
};

//the most profitable category for each week.
