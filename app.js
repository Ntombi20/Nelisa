var fs = require('fs');
var handlebars = require('./handlebars-v4.0.5');
//procssing the data to get the reports

function weelkySalesStats(week) {

  var mostLeastProduct = require('./mostLeastProduct');
  var category = require('./category');
  var profit = require('./profit');

  var groupWeek = mostLeastProduct.groupProduct(week);
  var mostProduct = mostLeastProduct.mostProduct(groupWeek);
  var leastProduct = mostLeastProduct.leastProduct(groupWeek);
  var weekCategory = category.groupCategory("./files/category.csv", groupWeek);
  var popularSalesCategory = category.mostCategory(weekCategory);
  var unpopularSalesCategory = category.leastCategory(weekCategory);
  var weekdate = new Date("7-Feb");
  var weekdate = new Date("14-Feb");
  var weekdate = new Date("21-Feb");
  var weekdate = new Date("28-Feb");
  var weekTotalCost = profit.salesByWeeks(week);
  var groupPurchases = profit.groupIntoweeks('./files/purchases.csv', weekdate).week
  var getProfitWeek = profit.getProfit(groupPurchases, weekTotalCost);
  var profitableProduct = profit.mostProfitableProduct(getProfitWeek);
  var profitCategory = category.groupCategory("./files/category.csv", getProfitWeek);
  var profitableCategory = profit.mostProfitableCategory(profitCategory)

  var sales = {
    mostProduct: mostProduct,
    leastProduct: leastProduct,
    popularSalesCategory: popularSalesCategory,
    unpopularSalesCategory: unpopularSalesCategory,
    profitableProduct: profitableProduct,
    profitableCategory: profitableCategory
  }

  return sales;
}

var data1 = weelkySalesStats('./files/week1.csv');
var data2 = weelkySalesStats('./files/week2.csv');
var data3 = weelkySalesStats('./files/week3.csv');
var data4 = weelkySalesStats('./files/week4.csv');

var source = fs.readFileSync('./views/index.handlebars', "utf8");

var template = handlebars.compile(source);

fs.writeFileSync('week1.html', template(data1))
fs.writeFileSync('week2.html', template(data2))
fs.writeFileSync('week3.html', template(data3))
fs.writeFileSync('week4.html', template(data4))

var express = require('./express-app/node_modules/express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000);
