'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    weeklySalesStats = require('./routes/weeklySalesStats'),
    categories = require('./routes/categories'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    suppliers = require('./routes/suppliers'),

    dbOptions = {
      host: 'localhost',
     user: 'root',
      port: 3306,
      password: '12345',
      database: 'nelisa_spaza_app'
};

var app = express();
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var week1 = weeklySalesStats.weeklySalesStats('./files/week1.csv');
var week2 = weeklySalesStats.weeklySalesStats('./files/week2.csv');
var week3 = weeklySalesStats.weeklySalesStats('./files/week3.csv');
var week4 = weeklySalesStats.weeklySalesStats('./files/week4.csv');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/weeklySalesStats/:week_name', function(req, res) {
    var week_name = req.params.week_name;

    if (Number(week_name.replace('week', '')) > 52) {
        return res.send("There's only 52 weeks in a year, invalid week " + week_name);
    }
    else if (Number(week_name.replace('week', '')) > 5) {
        return res.send("There's is no reports for " + week_name)
    }
    //get the proper data now...
    var weeklyData = weeklySalesStats.weeklySalesStats('./files/' + week_name + '.csv');

    //use your template here with weeklyData
    res.render('weeklySalesStats', {week: weeklyData,
                        weekName: week_name});
});

app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
app.get('/categories/delete/:id', categories.delete);

app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/delete/:id', products.delete);

app.get('/sales', sales.show);

app.get('/purchases', purchases.show);

app.get('/suppliers', suppliers.show);

//configure the port number using and environment number..
app.set('port', (process.env.PORT || 3000));

//start the app like this:
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
