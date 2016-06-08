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
    return weekDetails.length;

};


//Should group the data
exports.groupRecords = function(data) {

    var fs = require('fs');
    var productMap = {};
    var readFile = fs.readFileSync(data, "utf8");
    var week1 = readFile.split('\n').slice(1).filter(Boolean);

    week1.forEach(function(product) {
        var items = product.split(",");
        var stock_item = items[2];
        var number_sold = items[3];

        if (productMap[stock_item] === undefined) {
            productMap[stock_item] = 0;
        }

        productMap[stock_item] = productMap[stock_item] + Number(number_sold);

    });
    return productMap;

};

//Should group the data into categorys
exports.groupCategory = function(category) {

    var fs = require('fs');
    var categoryMap = {};
    var readFile = fs.readFileSync(category, "utf8");
    var group = readFile.split('\n').slice(1).filter(Boolean);

    group.forEach(function(groupCategory) {
        var item = groupCategory.split(",");
        var categoryName = item[0];
        var categoryItem = item[1];

        if (categoryMap[categoryItem] === undefined) {
            categoryMap[categoryItem] = "";
        }
        categoryMap[categoryItem] = categoryMap[categoryItem] + categoryName;
    })
    return categoryMap;
};

//Using groupCategory and groupCategory to the get the category and the total product sold in that category.
exports.category = function(categoryMap, productMap) {
    var category = {};

    for (var product in productMap) {
        if (category[categoryMap[product]] === undefined) {
            category[categoryMap[product]] = 0;
        }
            category[categoryMap[product]] = category[categoryMap[product]] + productMap[product];
    }
    return category;
};

//Filtering the records by Shop, Date, Item, Quantity, Cost, Total cost but return the length
exports.readPurchases = function(filePath) {

    var fs = require('fs');
    var details = [];
    var readFile = fs.readFileSync(filePath, "utf8");
    var bulks = readFile.split('\n').slice(1).filter(Boolean);

    bulks.forEach(function(product) {
        var items = product.split(";");
        details.push({
            Shop: items[0],
            Date: items[1],
            Item: items[2],
            Quantity: items[3],
            Cost: items[4],
            Total_cost: items[5]
        })
    });
    return details.length;

};
