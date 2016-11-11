var bcrypt = require('bcrypt');

exports.login = function(req, res, next) {
    req.getConnection(function(err, connection) {
        var data = {
            username: req.body.username,
            password: req.body.password
        };
        connection.query('select * from users where username = ?', data.username, function(err, results) {
            var user = results[0];
            //check if a user exist
            
            if (user === undefined) {
                req.flash("errorMsg", "User does not exist.")
                return res.redirect("/login");
            } else {
                bcrypt.compare(data.password, user.password, function(err, pass) {

                    if (pass) {
                        req.session.user = data.username;
                        console.log(req.session.user);
                        return res.redirect('/');
                    } else {
                        req.flash("errorMsg", "Incorrect username or password")
                        return res.redirect("/login");
                    };
                });
            };
        });

    });
};
