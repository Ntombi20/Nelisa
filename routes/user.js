// exports.show = function(req, res, next) {
//     req.getConnection(function(err, connection) {
//         if (err) return next(err);
//         connection.query('SELECT * from user', [], function(err, results) {
//             if (err) return next(err);
//             res.render('signup', {
//                 signup: results,
//             });
//         });
//     });
// };

// exports.showAdd = function(req, res) {
//     req.getConnection(function(err, connection) {
//         if (err) return next(err);
//         connection.query('SELECT * from user', [], function(err, user) {
//             if (err) return next(err);
//             res.render('signup', {
//                 user: user
//             });
//         });
//     });
// };
//add registered user in the user table
exports.addUser = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        connection.query('insert into user set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/login');
        });
    });
};
