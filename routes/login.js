var bcrypt = require('bcrypt');

exports.login = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        };

        var username = req.body.username;
        var password = req.body.password;

        connection.query('select * from users where username ?', username, function(err, results) {
          //check if a user exist
            var user = results[0];
            if (user === undefined) {
                console.log("User does not exist");
                return res.redirect("/login");
                //check if password entered is da same as da 1 in database
            }
            else if (password !== user.password) {
                console.log("Username or password incorrect");
                return res.redirect("/login")
            }
            else {
              //puts da user in session
                req.session.user = username;
                res.redirect('/');
            };
        });
    });
};

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, myPlaintextPassword, function(err, res) {
    res == true
    console.log(res);
});

bcrypt.compare(someOtherPlaintextPassword, myPlaintextPassword, hash, function(err, res) {
    res == false
});
