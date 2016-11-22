exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from suppliers ORDER BY id DESC', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'suppliers', {
					suppliers : results,
    		});
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
