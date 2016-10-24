exports.signUp = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        };

        var data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            admin: false

        };
        connection.query('insert into users set ?', data, function(err, results) {
            if (err) {
                console.log("Error inserting : %s ", err);
                return res.redirect("/error?error=" + err)
            };
            res.redirect('/login');
        });
    });
};
