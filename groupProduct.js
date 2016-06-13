//Filtering the records by Day, Date, Stock item, Number sold, SalesPrice.
exports.readRecords = function(filePath) {

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
    return weekDetails;

};


//Should group the data
exports.groupRecords = function(data) {

    var productMap = {};

    data.forEach(function(product) {

        var stock_item = product.Stock_item;
        var number_sold = product.Number_sold;

        if (productMap[stock_item] === undefined) {
            productMap[stock_item] = 0;
        }

        productMap[stock_item] = productMap[stock_item] + Number(number_sold);

    });
    return productMap;

};
