//The most popular product sold each week;
exports.mostProduct = function(records) {

    var qty = 0;
    var mostSold = {};

    for (var products in records) {
        if (records[products] > qty) {
            qty = records[products];
            mostSold = {
                item: products,
                qty: records[products]
            };
        }
    }
    return mostSold;
};

//The least popular product sold each week;
exports.leastProduct = function(records) {

    var qty = Infinity;
    var leastSold = "";

    for (var products in records) {
        if (records[products] < qty) {
            qty = records[products];
            leastSold = {
                item: products,
                qty: records[products]
            };
        }
    }
    return leastSold;
};
