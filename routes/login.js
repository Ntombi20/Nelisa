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
                console.log("User does not exist");
                return res.redirect("/login");
            }
            else{
                bcrypt.compare(data.password, user.password, function(err, pass) {
                    if (pass) {
                        req.session.user = data.username;
                        return res.redirect('/');
                    }
                    else {
                        return res.redirect("/login");
                    };
                });
            };
        });

    });
};
