//show products table
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT products.id as product_id, products.product, categories.categoryName FROM categories inner join products on products.category_Id = categories.Id ORDER BY product_id DESC', [], function(err, results) {
            if (err) return next(err);
            res.render('products', {
                products: results
            });
        });
    });
};

//show add product placeholder
exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from categories', [], function(err, categories) {
            if (err) return next(err);
            res.render('add_product', {
                categories: categories,
            });
        });
    });
};

//add product and category
exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            category_id: Number(req.body.category_id),
            product: req.body.product
        };

        connection.query('insert into products set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/products');
        });
    });
};

//edit product table
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

//update my table
exports.update = function(req, res, next) {

    var data = {
        category_id: Number(req.body.category_id),
        product: req.body.product,
    };

    var id = req.params.id;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/products');
        });
    });
};

//delete anything in the product table beside the ones with fk.
exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM products WHERE id = ?', [id], function(err, rows) {
            if (err)
                return next(err);
            res.redirect('/products');
        });
    });
};

exports.searchProduct = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var admin = req.session.role === 1;
	    var searchValue = "%" + req.body.value + "%";
        connection.query('SELECT products.id as product_id, products.product, categories.categoryName FROM categories inner join products on products.category_Id = categories.Id where categories.categoryName Like ?', [searchValue], function(err, results) {
            if (err) return next(err);
            res.render('product_search', {
                product: results,
                admin: admin
            });
        });
    });
};
