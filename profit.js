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

//the most profitable category for each week.
exports.mostProfitableCategory = function(data) {
    var product = 0;
    var profitCategory = "";

    for (var category in data) {
        if (data[category] > product) {
            product = data[category];
            profitCategory = category;
        }
    }
    return profitCategory;
};
