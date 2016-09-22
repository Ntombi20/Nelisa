exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT sales.id as sales_id, products.product, sales.quantity, sales.date, sales.price FROM products inner join sales on sales.products_id = products.id ORDER BY sales_id DESC', [], function(err, results) {
            if (err) return next(err);
            res.render('sales', {
                sales: results,
            });
        });
    });
};

//display add
exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from products', [], function(err, products) {
            if (err) return next(err);
            res.render('add_sales', {
                products: products
            });
        });
    });
};

//add sales field
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

//edit sales table
exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM products', [id], function(err, products) {
            if (err) return next(err);
            connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err, sales) {
                if (err) return next(err);
                var sales = sales[0];
                products = products.map(function(product) {
                    product.selected = product.id === product.product_id ? "selected" : "";
                    return product;
                });
                res.render('edit_sales', {
                    products: products,
                    data: sales
                });
            });
        });
    });
};

//update sales table
exports.update = function(req, res, next) {

    var data = {
        products_id: Number(req.body.products_id),
        date: req.body.date,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price)
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
