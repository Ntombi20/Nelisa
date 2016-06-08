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

//Should group the data for purchases
exports.groupPurchases = function(data) {

    var fs = require('fs');
    var details = [];
    var readFile = fs.readFileSync(data, "utf8");
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

    var purchase = {};
    details.forEach(function(products) {

        var item = products.Item;
        var total_cost = products.Total_cost.replace("R", "").replace(",", ".");

        if (purchase[item] === undefined) {
            purchase[item] = 0;
        }

        purchase[item] = purchase[item] + Number(total_cost);
    });
    return purchase;

};

//Should group the data for products
exports.groupWeeks = function(products) {

    var stockMap = {};

    products.forEach(function(data){

      var stock_item = data.Stock_item;
      var number_sold = data.Number_sold;
      var sales_Price = data.Sales_Price.replace("R", "");
      var total = sales_Price * number_sold;

      if (stockMap[stock_item] === undefined) {
          stockMap[stock_item] = 0;
      }

      stockMap[stock_item] = stockMap[stock_item] + total;
    });
    
    return stockMap;

};
