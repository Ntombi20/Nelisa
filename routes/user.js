// show users table
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from users ORDER BY username DESC', [], function(err, results) {
            if (err) return next(err);
            res.render('user', {
                users: results,
            });
        });
    });
};

//show add users button
exports.showAdd = function(req, res) {
    res.render('add_user');
}

//add users
exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        connection.query('insert into users set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/users');
        });

    });
};
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
