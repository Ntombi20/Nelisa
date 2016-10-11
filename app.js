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
    session = require('express-session'),

    dbOptions = {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: '12345',
      database: 'nelisa_spaza'
};

var app = express();
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//set up HttpSession middleware
app.use(session({
    secret: 'Ntombi smile',
    cookie: { maxAge: 6000 }
}));

var rolesMap = {
    "ntombi": "admin",
    "nelisa": "admin",
    "zolani": "admin"
}

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

var checkUser = function(req, res, next){
  console.log("checkUser...");
  if (req.session.user) {
    return next();
  }

  res.redirect("/login");
};

app.post('/login', function(req, res){
  req.session.user = {
    name : req.body.username,
    is_admin : rolesMap[req.body.username] === "admin"
  };
  res.redirect("/")
});

app.get('/', checkUser, function(req, res) {
    res.render('home', {user: req.session.user});
});

app.post('/', function(req, res) {

});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/logout', function (req, res){
  delete req.session.user;
  res.redirect("/login");
});

app.get('/weeklySalesStats/:week_name', checkUser, function(req, res) {
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

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/categories', checkUser, categories.show);
app.get('/categories/add', checkUser, categories.showAdd);
app.get('/categories/edit/:id', checkUser, categories.get);
app.post('/categories/update/:id', checkUser, categories.update);
app.post('/categories/add', checkUser, categories.add);
app.get('/categories/delete/:id', checkUser, categories.delete);

app.get('/products', checkUser, products.show);
app.get('/products/add', checkUser, products.showAdd);
app.get('/products/edit/:id', checkUser, products.get);
app.post('/products/update/:id', checkUser, products.update);
app.post('/products/add', checkUser, products.add);
app.get('/products/delete/:id', checkUser, products.delete);

app.get('/sales', checkUser, sales.show);
app.get('/sales/add', checkUser, sales.showAdd);
app.post('/sales/add', checkUser, sales.add);
app.get('/sales/edit/:id', checkUser, sales.get);
app.post('/sales/update/:id', checkUser, sales.update);
app.get('/sales/delete/:id', checkUser, sales.delete);

app.get('/purchases', checkUser, purchases.show);
app.get('/purchases/add', checkUser, purchases.showAdd);
app.post('/purchases/add', checkUser, purchases.add);
app.get('/purchases/edit/:id', checkUser, purchases.get);
app.post('/purchases/update/:id', checkUser, purchases.update);
app.get('/purchases/delete/:id', checkUser, purchases.delete);

app.get('/suppliers', checkUser, suppliers.show);

app.use(errorHandler);

//configure the port number using and environment number..
app.set('port', (process.env.PORT || 3000));

//start the app like this:
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
