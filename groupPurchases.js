//Should group weeks data by total cost(sales price * no sold) and stock item
exports.salesByWeeks = function(filePath) {
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

    var stockMap = {};

    weekDetails.forEach(function(data) {

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

//Should filter the data for purchases and get the length
exports.filterRecords = function(data) {

    var fs = require('fs');
    var readFile = fs.readFileSync(data, "utf8");
    var bulks = readFile.split('\n').slice(1).filter(Boolean);
    var removeJan = bulks.slice(24);

    var details = [];

    removeJan.forEach(function(product) {
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
    return details
};

//Should group the data for purchases into weeks
exports.groupIntoweeks = function(details, date, preDate) {

    var week1 = [];
    var week2 = [];
    var week3 = [];
    var week4 = [];

    details.forEach(function(data) {

        if (new Date(data.Date) < date) {
            week1.push({
                Item: data.Item,
                Cost: data.Total_cost,
                Date: data.Date
            })
        }

        if (new Date(data.Date) < date && new Date(data.Date) > preDate) {
            week2.push({
              Item: data.Item,
              Cost: data.Total_cost,
              Date: data.Date
            })
        }

        if (new Date(data.Date) < date && new Date(data.Date) > preDate) {
            week3.push({
              Item: data.Item,
              Cost: data.Total_cost,
              Date: data.Date
            })
        }

        if (new Date(data.Date) < date && new Date(data.Date) > preDate) {
            week4.push({
              Item: data.Item,
              Cost: data.Total_cost,
              Date: data.Date
            })
        }
    });

    var weeks = {
        week1: week1,
        week2: week2,
        week3: week3,
        week4: week4
    }
    return weeks;
};

exports.getPurchaseCost = function(week) {

    var purchase = {};

    week.forEach(function(products) {
        var item = products.Item;
        var cost = products.Cost.replace("R","").replace(",", ".");

        if (purchase[item] === undefined) {
            purchase[item] = 0;
        }

        purchase[item] = purchase[item] + Number(cost);
    })
    return purchase;
};

// Should use salesByWeeks and getPurchaseCost to get profit.
exports.getProfit = function(getPurchaseCost, salesByWeeks) {

    var profit = {};

    for (var purchase in salesByWeeks) {

        var salesForProduct = salesByWeeks[purchase] !== undefined ? salesByWeeks[purchase] : 0;
        var purchaseForProduct = getPurchaseCost[purchase] !== undefined ? getPurchaseCost[purchase] : 0;
        var salesProfit = salesForProduct - purchaseForProduct;
        
        if (profit[purchase] === undefined) {
            profit[purchase] = 0;
        }
        profit[purchase] = profit[purchase] + Number(salesProfit);
    }
    return profit;
};
