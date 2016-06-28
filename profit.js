exports.mostProfitableProduct = function(data) {
    //the most profitable cost for each week

    var cost = 0;
    var mostPProduct = "";

    for (var product in data) {
        if (data[product] > cost) {
            cost = data[product];
            mostPProduct = {
                item: product,
                cost: data[product]
            };
        }
    }
    return mostPProduct;
};

//the most profitable category for each week.
exports.mostProfitableCategory = function(data) {
    var profitCategory = "";
    var cost = 0;

    for (var category in data) {
        if (data[category] > cost) {
            cost = data[category];
            profitCategory = {
                item: category,
                cost: data[category]
            };
        }
    }
    return profitCategory;
};
