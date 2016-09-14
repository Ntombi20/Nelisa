exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from sales', [], function(err, results) {
            if (err) return next(err);
            res.render('sales', {
                sales: results,
            });
        });
    });
};

exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from sales', [], function(err, sales) {
            if (err) return next(err);
            res.render('add_sales', {
                sales: sales,
            });
        });
    });
};

exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            products_id: Number(req.body.products_id),
            date: req.body.date,
            quantity: Number(req.body.quantity),
            price: Number(req.body.price)
        };

        connection.query('insert into sales set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};


////////////////////////////////////
exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM sales', [id], function(err, sales) {
            if (err) return next(err);
            connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err, sales) {
                if (err) return next(err);
                var sale = sales[0];
                sales = sales.map(function(category) {
                    category.selected = category.id === sale.category_id ? "selected" : "";
                    return category;
                });
                res.render('edit_sales', {
                    sales: sales,
                    data: sale
                });
            });
        });
    });
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM categories', [id], function(err, categories) {
            if (err) return next(err);
            connection.query('SELECT * FROM products WHERE id = ?', [id], function(err, products) {
                if (err) return next(err);
                var product = products[0];
                categories = categories.map(function(category) {
                    category.selected = category.id === product.category_id ? "selected" : "";
                    return category;
                });
                res.render('edit_product', {
                    categories: categories,
                    data: product
                });
            });
        });
    });
};




exports.update = function(req, res, next) {

    var data = {
        category_id: Number(req.body.category_id),
        product: req.body.product,
    };
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM sales WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};
