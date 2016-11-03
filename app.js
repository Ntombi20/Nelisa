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
    signup = require('./routes/signup'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    suppliers = require('./routes/suppliers'),
    user = require('./routes/user'),
    login = require('./routes/login'),
    session = require('express-session'),
    flash        = require('express-flash'),

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

var rolesMap = {
    "ntombi": "admin",
    "nelisa": "admin",
    "zolani": "admin",
    "beauty": "view",
    "neo": "view"
}

var checkUser = function(req, res, next) {
    if (req.session.user) {
        return next();
    }

    res.redirect("/login");
};



app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    req.session.user = {
            name: req.body.username,
            is_admin: rolesMap[req.body.username] === "admin"
        }
    res.redirect("/")
});

app.get('/logout', function(req, res) {
    delete req.session.user;

    res.redirect("/login");
});

var week1 = weeklySalesStats.weeklySalesStats('./files/week1.csv');
var week2 = weeklySalesStats.weeklySalesStats('./files/week2.csv');
var week3 = weeklySalesStats.weeklySalesStats('./files/week3.csv');
var week4 = weeklySalesStats.weeklySalesStats('./files/week4.csv');

app.use(checkUser);
app.get('/', checkUser, function(req, res) {
    res.render('home', {
        user: req.session.user
    });
});

app.get('/weeklySalesStats/:week_name', checkUser, function(req, res) {
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
        // user: req.session.user
        week: weeklyData,
        weekName: week_name,
    });
});

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.get('/categories', checkUser, categories.show);
app.get('/categories/add', checkUser, categories.showAdd);
app.get('/categories/edit/:id', checkUser, categories.get);
app.post('/categories/update/:id', checkUser, categories.update);
app.post('/categories/add', checkUser,  categories.add);
app.get('/categories/delete/:id', checkUser,  categories.delete);

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

app.get('/users', checkUser, user.show);
app.get('/users/add', checkUser, user.showAdd);
app.post('/users/add', checkUser, user.addUser);
app.get('/users/edit/:id', checkUser, user.get);
app.post('/users/update/:id', checkUser, user.update);
app.get('/users/delete/:id', checkUser, user.delete);

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', login.login);

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', signup.signUp);

app.use(errorHandler);

//configure the port number using and environment number..
app.set('port', (process.env.PORT || 3000));

//start the app like this:
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
