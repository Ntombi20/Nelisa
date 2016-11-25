var bcrypt = require('bcrypt');

exports.signUp = function(req, res, next) {
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
            req.flash("errorMsg", "Password do not match.");
            return next(err);
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;

                connection.query('insert into users set ?', data, function(err, results) {
                    if (err) {
                        return res.redirect("/error?error=" + err)
                    };

                    var user = results[0];

                    if (data.username === results.username) {
                        req.flash("errorMsg", "Username is taken.");
                        return res.redirect('/signup');
                    }
                    res.redirect('/login');
                });
            });
        });

    });

};
