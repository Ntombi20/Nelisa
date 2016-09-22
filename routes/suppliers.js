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
