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

//Should filter the data for purchases nd get the length
exports.filterRecords = function(data) {

    var fs = require('fs');
    var readFile = fs.readFileSync(data, "utf8");
    var bulks = readFile.split('\n').slice(1).filter(Boolean);

    var details = [];

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
    return details
};

//Should group the data for purchases into weeks
exports.groupIntoweeks = function(details) {

    var week1 = [];
    var week2 = [];
    var week3 = [];
    var week4 = [];

    var week0date = new Date("31-Jan");
    var week1date = new Date("7-Feb");
    var week2date = new Date("14-Feb");
    var week3date = new Date("21-Feb");
    var week4date = new Date("1-Mar");

    details.forEach(function(data) {
        if (new Date(data.Date) < week1date && new Date(data.Date) > week0date) {
            week1.push({
                Item: data.Item,
                Quantity: data.Quantity,
                Cost: data.Cost,
                Date: data.Date
            })
        }

        if (new Date(data.Date) < week2date && new Date(data.Date) > week1date) {
            week2.push({
                Item: data.Item,
                Quantity: data.Quantity,
                Cost: data.Cost,
                Date: data.Date
            })
        }

        if (new Date(data.Date) < week3date && new Date(data.Date) < week2date) {
            week3.push({
                Item: data.Item,
                Quantity: data.Quantity,
                Cost: data.Cost,
                Date: data.Date
            })
        }

        if (new Date(data.Date) < week4date && new Date(data.Date) < week3date) {
            week4.push({
                Item: data.Item,
                Quantity: data.Quantity,
                Cost: data.Cost,
                Date: data.Date
            })
        }

    });

    var purchase = {};


     week1.forEach(function(products) {

         var item = products.Item;
         var qty = products.Quantity;

         if (purchase[item] === undefined) {
             purchase[item] = 0;
         }

         purchase[item] = purchase[item] + Number(qty);
     });
     return purchase;

 };

// Should use groupByWeeks and groupPurchases to get profit.
exports.getProfit = function(groupByWeeks, groupByPurchases) {

    var profit = {};

    for (var purchase in groupByPurchases) {
        var getTotal = groupByPurchases[purchase] - groupByWeeks[purchase];
        if (profit[purchase] === undefined) {
            profit[purchase] = 0;
        }
        profit[purchase] = profit[purchase] + Number(getTotal);
    }
  
    return profit;
};
