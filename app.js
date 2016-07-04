var fs = require('fs');
var handlebars = require('./handlebars-v4.0.5');
var mostLeastProduct = require('./mostLeastProduct');
var category = require('./category');
var profit = require('./profit');
//procssing the data to get the reports
var week1date = new Date("7-Feb");
var week2date = new Date("14-Feb");
var week3date = new Date("21-Feb");
var week4date = new Date("28-Feb");
var groupWeek1 = mostLeastProduct.groupProduct('./files/week1.csv');
var mostProduct1 = mostLeastProduct.mostProduct(groupWeek1);
var leastProduct1 = mostLeastProduct.leastProduct(groupWeek1);
var week1Category = category.groupCategory("./files/category.csv", groupWeek1);
var popularSalesCategory1 = category.mostCategory(week1Category);
var unpopularSalesCategory1 = category.leastCategory(week1Category);
var week1TotalCost = profit.salesByWeeks('./files/week1.csv');
var groupPurchases1 = profit.groupIntoweeks('./files/purchases.csv', week1date).week1
var getProfitWeek1 = profit.getProfit(groupPurchases1, week1TotalCost);
var profitableProduct1 = profit.mostProfitableProduct(getProfitWeek1);
var profitCategory1 = category.groupCategory("./files/category.csv", getProfitWeek1);
var profitableCategory1 = profit.mostProfitableCategory(profitCategory1)

var groupWeek2 = mostLeastProduct.groupProduct('./files/week2.csv');
var mostProduct2 = mostLeastProduct.mostProduct(groupWeek2);
var leastProduct2 = mostLeastProduct.leastProduct(groupWeek2);
var week2Category = category.groupCategory("./files/category.csv", groupWeek2);
var popularSalesCategory2 = category.mostCategory(week2Category);
var unpopularSalesCategory2 = category.leastCategory(week2Category);
var week2TotalCost = profit.salesByWeeks('./files/week2.csv');
var groupPurchases2 = profit.groupIntoweeks('./files/purchases.csv', week2date).week2
var getProfitWeek2 = profit.getProfit(groupPurchases2, week2TotalCost);
var profitableProduct2 = profit.mostProfitableProduct(getProfitWeek2);
var profitCategory2 = category.groupCategory("./files/category.csv", getProfitWeek2);
var profitableCategory2 = profit.mostProfitableCategory(profitCategory2)

var groupWeek3 = mostLeastProduct.groupProduct('./files/week3.csv');
var mostProduct3 = mostLeastProduct.mostProduct(groupWeek3);
var leastProduct3 = mostLeastProduct.leastProduct(groupWeek3);
var week3Category = category.groupCategory("./files/category.csv", groupWeek3);
var popularSalesCategory3 = category.mostCategory(week3Category);
var unpopularSalesCategory3 = category.leastCategory(week3Category);
var week3TotalCost = profit.salesByWeeks('./files/week3.csv');
var groupPurchases3 = profit.groupIntoweeks('./files/purchases.csv', week3date).week3
var getProfitWeek3 = profit.getProfit(groupPurchases3, week3TotalCost);
var profitableProduct3 = profit.mostProfitableProduct(getProfitWeek3);
var profitCategory3 = category.groupCategory("./files/category.csv", getProfitWeek3);
var profitableCategory3 = profit.mostProfitableCategory(profitCategory3)

var groupWeek4 = mostLeastProduct.groupProduct('./files/week4.csv');
var mostProduct4 = mostLeastProduct.mostProduct(groupWeek4);
var leastProduct4 = mostLeastProduct.leastProduct(groupWeek4);
var week4Category = category.groupCategory("./files/category.csv", groupWeek4);
var popularSalesCategory4 = category.mostCategory(week4Category);
var unpopularSalesCategory4 = category.leastCategory(week4Category);
var week4TotalCost = profit.salesByWeeks('./files/week4.csv');
var groupPurchases4 = profit.groupIntoweeks('./files/purchases.csv', week4date).week4
var getProfitWeek4 = profit.getProfit(groupPurchases4, week4TotalCost);
var profitableProduct4 = profit.mostProfitableProduct(getProfitWeek4);
var profitCategory4 = category.groupCategory("./files/category.csv", getProfitWeek4);
var profitableCategory4 = profit.mostProfitableCategory(profitCategory4)

var source = fs.readFileSync('./index.handlebars', "utf8");

var template = handlebars.compile(source);

var data1 = {key: [mostProduct1, leastProduct1, popularSalesCategory1, unpopularSalesCategory1, profitableProduct1, profitableCategory1]}
var data2 = {key: [mostProduct2, leastProduct2, popularSalesCategory2, unpopularSalesCategory2, profitableProduct2, profitableCategory2]}
var data3 = {key: [mostProduct3, leastProduct3, popularSalesCategory3, unpopularSalesCategory3, profitableProduct3, profitableCategory3]}
var data4 = {key: [mostProduct4, leastProduct4, popularSalesCategory4, unpopularSalesCategory4, profitableProduct4, profitableCategory4]}

fs.writeFileSync('week1.html', template(data1))
fs.writeFileSync('week2.html', template(data2))
fs.writeFileSync('week3.html', template(data3))
fs.writeFileSync('week4.html', template(data4))
