var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//procssing the data to get the reports

function weelkySalesStats(week) {

  var mostLeastProduct = require('./mostLeastProduct');
  var category = require('./category');
  var profit = require('./profit');

  var groupWeek = mostLeastProduct.groupProduct(week);
  var mostProduct = mostLeastProduct.mostProduct(groupWeek);
  var leastProduct = mostLeastProduct.leastProduct(groupWeek);
  var weekCategory = category.groupCategory("./files/category.csv", groupWeek);
  var popularSalesProduct = category.mostCategory(weekCategory);
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
    popularSalesProduct: popularSalesProduct,
    unpopularSalesCategory: unpopularSalesCategory,
    profitableProduct: profitableProduct,
    profitableCategory: profitableCategory
  }

  return sales;
}

var week1 = weelkySalesStats('./files/week1.csv');
var week2 = weelkySalesStats('./files/week2.csv');
var week3 = weelkySalesStats('./files/week3.csv');
var week4 = weelkySalesStats('./files/week4.csv');

app.get('/sales/week1', function (req, res) {
    res.render('week1', {
      week: week1
    });
});
app.get('/sales/week2', function (req, res) {
    res.render('week2', {
      week: week2
    });
});
app.get('/sales/week3', function (req, res) {
    res.render('week3', {
      week: week3
    });
});
app.get('/sales/week4', function (req, res) {
    res.render('week4', {
      week: week4
    });
});

app.listen(3010);
console.log("running port 3010")
