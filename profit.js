//the most profitable product for each week
exports.mostProfitableProduct = function(data) {
    var price = 0;
    var bulk = "";

    for (var product in data) {
        if (data[product] > price) {
            price = data[product];
            bulk = product;
        }
    }
    return bulk;
};
