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

        var user = data.username;
        var password = data.password;

        bcrypt.genSalt(10, function(salt) {
            bcrypt.hash(password, salt, function(hash) {
                data.password = hash;
                console.log(hash);
            });

        });


        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Password do not match.');
            err.status = 400;
            return next(err);
        }

        connection.query('insert into users set ?', data, function(err, results) {
            if (err) {
                console.log("Error inserting : %s ", err);
                return res.redirect("/error?error=" + err)
            };
            res.redirect('/login');
        });
    });
};
