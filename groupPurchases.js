
//Should group the data for purchases
// exports.groupPurchases = function(data) {
//
//     var fs = require('fs');
//     var details = [];
//     var readFile = fs.readFileSync(data, "utf8");
//     var bulks = readFile.split('\n').slice(1).filter(Boolean);
//
//     bulks.forEach(function(product) {
//         var items = product.split(";");
//         if(items[1] === "1-Mar"){
//           var new_Date = items[1].slice(1)
//           console.log(new_Date);
//         }
//         //.log(weeks);
//         // details.push({
//         //     Shop: items[0],
//         //     Date: items[1],
//         //     Item: items[2],
//         //     Quantity: items[3],
//         //     Cost: items[4],
//         //     Total_cost: items[5]
//         // })
//     });
//
//     // var purchase = {};
//     // details.forEach(function(products) {
//     //
//     //     var item = products.Item;
//     //     var total_cost = products.Total_cost.replace("R", "").replace(",", ".");
//     //
//     //     if (purchase[item] === undefined) {
//     //         purchase[item] = 0;
//     //     }
//     //
//     //     purchase[item] = purchase[item] + Number(total_cost);
//     // });
//     // return purchase;
//
// };
//
// //Should group the data for products
// exports.groupByWeeks = function(products) {
//     var stockMap = {};
//
//     products.forEach(function(data) {
//
//         var stock_item = data.Stock_item;
//         var number_sold = data.Number_sold;
//         var sales_Price = data.Sales_Price.replace("R", "");
//         var total = sales_Price * number_sold;
//
//         if (stockMap[stock_item] === undefined) {
//             stockMap[stock_item] = 0;
//         }
//
//         stockMap[stock_item] = stockMap[stock_item] + total;
//     });
//     return stockMap;
//
// };
//
// //Should use groupByWeeks and groupPurchases to get profit
// exports.getProfit = function(groupByWeeks, groupByPurchases) {
//     var profit = {};
//
//     for (var purchase in groupByPurchases) {
//             var getTotal = groupByWeeks[purchase] - groupByPurchases[purchase];
//             if (profit[purchase] === undefined) {
//                 profit[purchase] = 0;
//             }
//         profit[purchase] = profit[purchase] + Number(getTotal);
//     }
//     return profit;
// };
//
//
// //Using groupCategory and groupByWeek for to the get the category and the total product sold in that category.
// // exports.getProfitCategory  = function(categoryMap, productMap) {
// //     var category = {};
// //
// //     for (var product in productMap) {
// //         if (category[categoryMap[product]] === undefined) {
// //             category[categoryMap[product]] = 0;
// //         }
// //       category[categoryMap[product]] = category[categoryMap[product]] + productMap[product];
// //     }
// //     return category;
// // };
