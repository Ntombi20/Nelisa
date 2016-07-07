var express = require('./express-app/node_modules/express');
var exphbs  = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.enable('view cache');

app.get('/', function (req, res, next) {
    //var context = {name: "Ntombi"};
    res.render('home', {
        showTitle: true,

        // Override `foo` helper only for this rendering.
        helpers: {
            foo: function () { return 'foo.'; }
        }
    });
});

app.listen(3010);
