var fs = require('fs');
var handlebars = require('./handlebars-v4.0.5');
var mostLeastProduct = require('./mostLeastProduct');
var category = require('./category');
var groupCategory = require('./groupCategory');
var profit = require('./profit');
var groupPurchases = require('./groupPurchases');

//procssing the data to get the reports
// var categoryGroup = groupCategory.groupCategory('./files/category.csv');
// var filterPurchases = groupPurchases.filterRecords('./files/purchases.csv');

var groupWeek1 = mostLeastProduct.groupProduct('./files/week1.csv');
var mostProduct1 = mostLeastProduct.mostProduct(groupWeek1);
var leastProduct1 = mostLeastProduct.leastProduct(groupWeek1);

// var week1Category = groupCategory.category(categoryGroup, groupWeek1);
// var popularSalesCategory1 = category.mostCategory(week1Category);
// var unpopularSalesCategory1 = category.leastCategory(week1Category);
// var week1TotalCost = groupPurchases.salesByWeeks('./files/week1.csv')
//
// var week2 = groupProduct.readRecords('./files/week2.csv');
// var groupWeek2 = groupProduct.groupRecords(week2);
// var mostProduct2 = mostLeastProduct.mostProduct(groupWeek2);
// var leastProduct2 = mostLeastProduct.leastProduct(groupWeek2);
// var week2Category = groupCategory.category(categoryGroup, groupWeek2);
// var popularSalesCategory2 = category.mostCategory(week2Category);
// var unpopularSalesCategory2 = category.leastCategory(week2Category);
// var week2TotalCost = groupPurchases.salesByWeeks('./files/week2.csv')
//
// var week3 = groupProduct.readRecords('./files/week3.csv');
// var groupWeek3 = groupProduct.groupRecords(week3);
// var mostProduct3 = mostLeastProduct.mostProduct(groupWeek3);
// var leastProduct3 = mostLeastProduct.leastProduct(groupWeek3);
// var week3Category = groupCategory.category(categoryGroup, groupWeek3);
// var popularSalesCategory3 = category.mostCategory(week3Category);
// var unpopularSalesCategory3 = category.leastCategory(week3Category);
// var week3TotalCost = groupPurchases.salesByWeeks('./files/week3.csv')
//
// var week4 = groupProduct.readRecords('./files/week4.csv');
// var groupWeek4 = groupProduct.groupRecords(week4);
// var mostProduct4 = mostLeastProduct.mostProduct(groupWeek4);
// var leastProduct4 = mostLeastProduct.leastProduct(groupWeek4);
// var week4Category = groupCategory.category(categoryGroup, groupWeek4);
// var popularSalesCategory4 = category.mostCategory(week4Category);
// var unpopularSalesCategory4 = category.leastCategory(week4Category);
// var week4TotalCost = groupPurchases.salesByWeeks('./files/week4.csv');

var source = fs.readFileSync('./index.handlebars', "utf8");

var template = handlebars.compile(source);

var data1 = {key: [mostProduct1, leastProduct1]}
// var data2 = {key: [mostProduct2, leastProduct2, popularSalesCategory2, unpopularSalesCategory2]}
// var data3 = {key: [mostProduct3, leastProduct3, popularSalesCategory3, unpopularSalesCategory3]}
// var data4 = {key: [mostProduct4, leastProduct4, popularSalesCategory4, unpopularSalesCategory4]}
//
fs.writeFileSync('week1.html', template(data1))
// fs.writeFileSync('week2.html', template(data2))
// fs.writeFileSync('week3.html', template(data3))
// fs.writeFileSync('week4.html', template(data4))
