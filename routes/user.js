var bcrypt = require('bcrypt');

// show users table
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from users ORDER BY username DESC', [], function(err, results) {
            if (err) return next(err);
            res.render('users', {
                users: results
            });
        });
    });
};

//show add users button
exports.showAdd = function(req, res) {
    res.render('add_user');
}

exports.addUser = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        };

        var data = {
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            email: req.body.email,
            admin: false

        };

        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Password do not match.');
            err.status = 400;
            return next(err);
        }

        //  req.session.user = {
        //    admin: req.session.admin,
        //    user: req.session.user
        //  }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;

                connection.query('insert into users set ?', data, function(err, results) {
                    if (err) {
                        console.log("Error inserting : %s ", err);
                        return res.redirect("/error?error=" + err)
                    };

                    res.redirect('/users');
                });
            });
        });

    });

};

//edit users
exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows){
			if(err) return next(err);
			res.render('edit_user',{
        data : rows[0],
        // admin: req.session.admin,
        // user: req.session.user
      });
		});
	});
};

//update categories table
exports.update = function(req, res, next){
  var data = req.body;
  var id = req.params.id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/users');
    		});

    });
};

//delete user
exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM users WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/users');
		});
	});
};
