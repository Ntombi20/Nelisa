var bcrypt = require('bcrypt');

var login = function(req, res, next) {
    req.getConnection(function(err, connection) {
        var username = req.body.username;
        // var password = req.body.password;

        connection.query('select * from users where username ?', username, function(err, results) {
            //check if a user exist
            console.log(results);
            var user = results[1];
            console.log(user);
            if (user === undefined) {
                console.log("User does not exist");
                return res.redirect("/login");
            } 
            else {
                brcypt.compare(password, user.password, function(err, pass) {
                    if (pass) {
                        req.session.user = username;
                        return res.redirect('/home');
                    } else {
                        return res.redirect("/login");
                        console.log(err);
                    };
                });
            };
        });

    });
};

// connection.query('select * from users where username ?', username, function(err, results) {
//     if (err) {
//         return next(err);
//     };
//     console.log(username);
//     //check if a user exist
//     var user = results[0];
//     if (user === undefined) {
//         console.log("User does not exist");
//         return res.redirect("/login");
//         //check if password entered is da same as da 1 in database
//     }
// else if (password !== user.password) {
//     console.log("Username or password incorrect");
//     return res.redirect("/login")
// }
// else {
//     //puts da user in session
//     req.session.user = username;
//     res.redirect('/');
// };
// });
// });
