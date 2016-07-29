var express = require('express');
    exphbs = require('express-handlebars');
    fs = require('fs');
    app = express();
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'ntombi',
      password: 'nicolenma20',
      port: 2500,
      database: 'nelisa_spaza_app'
    };

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single');

//procssing the data to get the reports
function weelkySalesStats(week) {

    var mostLeastProduct = require('./routes/mostLeastProduct');
    var category = require('./routes/category');
    var profit = require('./routes/profit');

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

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/sales/:week_name', function(req, res) {
    var week_name = req.params.week_name;

    if (Number(week_name.replace('week', '')) > 52) {
        return res.send("There's only 52 weeks in a year, invalid week " + week_name);
    }
    else if (Number(week_name.replace('week', '')) > 5) {
        return res.send("There's is no reports for " + week_name)
    }
    //get the proper data now...
    var weeklyData = weelkySalesStats('./files/' + week_name + '.csv');

    //use your template here with weeklyData
    res.render('index', {week: weeklyData,
                        weekName: week_name});
});

//configure the port number using and environment number.
app.set('port', (process.env.PORT || 2500));

//start the app like this:
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
