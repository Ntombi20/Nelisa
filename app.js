'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('express-flash'),
    weeklySalesStats = require('./routes/weeklySalesStats'),
    categories = require('./routes/categories'),
    products = require('./routes/products'),
    signup = require('./routes/signup'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    suppliers = require('./routes/suppliers'),
    user = require('./routes/user'),
    login = require('./routes/login'),
    middleware = require('./middleware'),
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
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
    }))
    // parse application/json
app.use(bodyParser.json())

//flash msgs
app.use(flash());
//set up HttpSession middleware
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true
}));

var week1 = weeklySalesStats.weeklySalesStats('./files/week1.csv');
var week2 = weeklySalesStats.weeklySalesStats('./files/week2.csv');
var week3 = weeklySalesStats.weeklySalesStats('./files/week3.csv');
var week4 = weeklySalesStats.weeklySalesStats('./files/week4.csv');


app.use(middleware.setupUserDetails);

app.get('/', middleware.checkUser, function(req, res) {
    res.render('home', {user: req.session.user});
});

app.get('/weeklySalesStats/:week_name', middleware.checkUser, middleware.isAdmin, function(req, res) {
    var week_name = req.params.week_name;

    if (Number(week_name.replace('week', '')) > 52) {
        return res.send("There's only 52 weeks in a year, invalid week " + week_name);
    } else if (Number(week_name.replace('week', '')) > 5) {
        return res.send("There's is no reports for " + week_name)
    }
    //get the proper data now...
    var weeklyData = weeklySalesStats.weeklySalesStats('./files/' + week_name + '.csv');

    //use your template here with weeklyData
    res.render('weeklySalesStats', {
        week: weeklyData,
        weekName: week_name
    });
});

app.get('/categories', middleware.checkUser, categories.show);
app.get('/categories/add', middleware.checkUser, middleware.isAdmin, categories.showAdd);
app.get('/categories/edit/:id', middleware.checkUser, middleware.isAdmin, categories.get);
app.post('/categories/update/:id', middleware.checkUser, middleware.isAdmin, categories.update);
app.post('/categories/add', middleware.checkUser, middleware.isAdmin, categories.add);
app.get('/categories/delete/:id', middleware.checkUser, middleware.isAdmin, categories.delete);

app.get('/products', middleware.checkUser, products.show);
app.get('/products/add', middleware.checkUser, middleware.isAdmin, products.showAdd);
app.get('/products/edit/:id', middleware.checkUser, middleware.isAdmin, products.get);
app.post('/products/update/:id', middleware.checkUser, middleware.isAdmin, products.update);
app.post('/products/add', middleware.checkUser, middleware.isAdmin, products.add);
app.get('/products/delete/:id', middleware.checkUser, middleware.isAdmin, products.delete);
app.post('/products/search/', middleware.checkUser, products.searchProduct);
app.get('/products/search/:searchValue', middleware.checkUser, products.searchProduct);

app.get('/sales', middleware.checkUser, middleware.isAdmin, sales.show);
app.get('/sales/add', middleware.checkUser, middleware.isAdmin, sales.showAdd);
app.post('/sales/add', middleware.checkUser, middleware.isAdmin, sales.add);
app.get('/sales/edit/:id', middleware.checkUser, middleware.isAdmin, sales.get);
app.post('/sales/update/:id', middleware.checkUser, middleware.isAdmin, sales.update);
app.get('/sales/delete/:id', middleware.checkUser, middleware.isAdmin, sales.delete);

app.get('/purchases', middleware.checkUser, middleware.isAdmin, purchases.show);
app.get('/purchases/add', middleware.checkUser, middleware.isAdmin, purchases.showAdd);
app.post('/purchases/add', middleware.checkUser, middleware.isAdmin, purchases.add);
app.get('/purchases/edit/:id', middleware.checkUser, middleware.isAdmin, purchases.get);
app.post('/purchases/update/:id', middleware.checkUser, middleware.isAdmin, purchases.update);
app.get('/purchases/delete/:id', middleware.checkUser, middleware.isAdmin, purchases.delete);

app.get('/suppliers', middleware.checkUser, middleware.isAdmin, suppliers.show);

app.get('/users', middleware.checkUser, middleware.isAdmin, user.show);
app.get('/users/add', middleware.checkUser, middleware.isAdmin, user.showAdd);
app.post('/users/add', middleware.checkUser, middleware.isAdmin, user.addUser);
app.get('/users/edit/:id', middleware.checkUser, middleware.isAdmin, user.get);
app.post('/users/update/:id', middleware.checkUser, middleware.isAdmin, user.update);
app.get('/users/delete/:id', middleware.checkUser, middleware.isAdmin, user.delete);

app.get('/login', function(req, res) {
    res.render('login');
});

// app.post('/login', login.login);
app.post("/login", login.login, function(req, res){
  req.session.user = {
    name: req.body.username,
    admin: req.session.role === 1
  }
  res.redirect("/home");
});

app.get('/logout', function(req, res) {
    delete req.session.user;
    res.redirect("/login");
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', signup.signUp);

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.use(errorHandler);

//configure the port number using and environment number..
app.set('port', (process.env.PORT || 3000));

//start the app like this:
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
