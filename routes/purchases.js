//diplay purchases table
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT purchases.id as purchases_id, products.product, suppliers.shop, purchases.quantity, purchases.price, purchases.date FROM purchases inner join products on purchases.products_id = products.id inner join suppliers on purchases.suppliers_id = suppliers.id', [], function(err, results) {
            if (err) return next(err);
            res.render('purchases', {
                purchases: results,
            });
        });
    });
};

//display add button
exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from products', [], function(err, products) {
            if (err) return next(err);
            connection.query('SELECT * from suppliers', [], function(err, suppliers) {
                if (err) return next(err);
                res.render('add_purchases', {
                    products: products,
                    suppliers: suppliers
                });
            });
        });
    });
};

//add purchases field
exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            products_id: Number(req.body.products_id),
            suppliers_id: Number(req.body.suppliers_id),
            date: req.body.date,
            quantity: Number(req.body.quantity),
            price: Number(req.body.price)
        };

        connection.query('insert into purchases set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};

//edit purchases table
exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM products', [id], function(err, products) {
            if (err) return next(err);
            connection.query('SELECT * FROM suppliers', [id], function(err, suppliers) {
                if (err) return next(err);
                connection.query('SELECT * FROM purchases WHERE id = ?', [id], function(err, purchases) {
                    if (err) return next(err);
                    var purchases = purchases[0];
                    products = products.map(function(product) {
                        product.selected = product.id === product.product_id ? "selected" : "";
                        return product;
                    });
                    suppliers = suppliers.map(function(supplier) {
                        supplier.selected = supplier.id === supplier.supplier_id ? "selected" : "";
                        return supplier;
                    });
                    res.render('edit_purchases', {
                        products: products,
                        suppliers: suppliers,
                        data: purchases
                    });
                });
            });
        });
    });
};

//update purchases table
exports.update = function(req, res, next) {

    var data = {
        products_id: Number(req.body.products_id),
        suppliers_id: Number(req.body.suppliers_id),
        date: req.body.date,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price)
    };
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};
