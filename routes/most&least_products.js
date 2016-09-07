//Grouping data by item and quantity.
exports.groupProduct = function(filePath) {

    var fs = require('fs');
    var weekDetails = [];
    var readFile = fs.readFileSync(filePath, "utf8");
    var week = readFile.split('\n').slice(1).filter(Boolean);

    week.forEach(function(product) {
        var items = product.split(",");
        weekDetails.push({
            Day: items[0],
            Date: items[1],
            Stock_item: items[2],
            Number_sold: items[3],
            Sales_Price: items[4]
        })
    });

    var productMap = {};

    weekDetails.forEach(function(product) {

        var stock_item = product.Stock_item;
        var number_sold = product.Number_sold;

        if (productMap[stock_item] === undefined) {
            productMap[stock_item] = 0;
        }

        productMap[stock_item] = productMap[stock_item] + Number(number_sold);

    });
    return productMap;

};

//The most popular product sold each week;
exports.mostProduct = function(data) {

    var qty = 0;
    var mostSold = {};

    for (var products in data) {
        if (data[products] > qty) {
            qty = data[products];
            mostSold = {
                item: products,
                qty: data[products]
            };
        }
    }
    return mostSold;
};

//The least popular product sold each week;
exports.leastProduct = function(data) {

    var qty = Infinity;
    var leastSold = "";

    for (var products in data) {
        if (data[products] < qty) {
            qty = data[products];
            leastSold = {
                item: products,
                qty: data[products]
            };
        }
    }
    return leastSold;
};
