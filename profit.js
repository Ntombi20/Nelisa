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

//Should group the data for purchases into weeks
exports.groupIntoweeks = function(purchasesCSV, date, preDate) {

    var fs = require('fs');
    var readFile = fs.readFileSync(purchasesCSV, "utf8");
    var bulks = readFile.split('\n').slice(1).filter(Boolean);
    var removeJan = bulks.slice(24);

    var details = [];

    removeJan.forEach(function(product) {
        var items = product.replace("R", "").replace(",", ".").split(";");

        details.push({
            Shop: items[0],
            Date: items[1],
            Item: items[2],
            Quantity: items[3],
            Cost: items[4].replace("R", "").replace(",", "."),
            Total_cost: items[5].replace("R", "").replace(",", ".")
        })
    });

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
    return weeks
};

// Should use salesByWeeks and getPurchaseCost to get profit.
exports.getProfit = function(groupByweeks, salesByWeeks) {
    var groupPurchase = {};

    for (var weeks in groupByweeks) {
        var item = groupByweeks[weeks].Item;
        var cost = groupByweeks[weeks].Cost;
        if (groupPurchase[item] === undefined) {
            groupPurchase[item] = 0;
        }
        groupPurchase[item] = groupPurchase[item] + Number(cost);
    }

    var profit = {};

    for (var purchase in salesByWeeks) {

        var salesForProduct = salesByWeeks[purchase] !== undefined ? salesByWeeks[purchase] : 0;
        var purchaseForProduct = groupPurchase[purchase] !== undefined ? groupPurchase[purchase] : 0;
        var salesProfit = salesForProduct - purchaseForProduct;

        if (profit[purchase] === undefined) {
            profit[purchase] = 0;
        }
        profit[purchase] = profit[purchase] + Number(salesProfit);
    }
    return profit;
};

exports.mostProfitableProduct = function(data) {
    //the most profitable cost for each week

    var cost = 0;
    var mostPProduct = "";

    for (var product in data) {
        if (data[product] > cost) {
            cost = data[product];
            mostPProduct = {
                Item: product,
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
                Item: category,
                cost: data[category]
            };
        }
    }
    return profitCategory;
};
