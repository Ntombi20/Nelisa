// show categories table
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from categories ORDER BY id DESC', [], function(err, results) {
            if (err) return next(err);
            res.render('categories', {
                categories: results
            });
        });
    });
};

//show add category button
exports.showAdd = function(req, res){
	res.render('add_category');
}

//add category
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body;
		var data = {
      		categoryName : input.categoryName,
  	};

	connection.query('insert into categories set ?', data, function(err, results) {
			if (err) return next(err);
		res.redirect('/categories');
	});

	});
};

//edit category
exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err, rows){
			if(err) return next(err);
			res.render('edit_category',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

//update categories table
exports.update = function(req, res, next){
  var data = req.body;
  var id = req.params.id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE categories SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/categories');
    		});

    });
};

//delete category
exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
};

//search values
exports.searchCategory = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var admin = req.session.role === 1;
	    var searchValue = "%" + req.body.value + "%";
        connection.query('SELECT * from categories where id Like ?', [searchValue], function(err, results) {
            if (err) return next(err);
            res.render('category_search', {
                category: results,
                admin: admin
            });
        });
    });
};
