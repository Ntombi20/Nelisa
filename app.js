var fs = require('fs');
var handlebars = require('./handlebars-v4.0.5');
var mostLeastProduct = require('./mostLeastProduct');
var groupProduct = require('./groupProduct');
var category = require('./category');
var groupCategory = require('./groupCategory');
var profit = require('./profit');
var groupPurchases = require('./groupPurchases');

//procssing the data to get the reports for productsSold
var week1 = groupProduct.readRecords('./files/week1.csv');
var groupWeek1 = groupProduct.groupRecords(week1);
var mostProduct1 = mostLeastProduct.mostProduct(groupWeek1);

var source = fs.readFileSync('./index2.hbs', "utf8");

var template = handlebars.compile(source);

var data = {key: [mostProduct1]}

fs.writeFileSync('index.html', template(data))
