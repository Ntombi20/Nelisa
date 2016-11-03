var bcrypt = require('bcrypt');

exports.login = function(req, res, next) {
    req.getConnection(function(err, connection) {
        var data = {
            username: req.body.username,
            password: req.body.password,
        };
        connection.query('select * from users where username ?', data.username, function(err, results) {
          console.log('login...' + err);

          if (err) return next(err);


            //check if a user exist
            // if (data.username === undefined) {
            //     console.log("User does not exist");
            //     return res.redirect("/login");
            // }


                brcypt.compare(data.password, users.password, function(err, pass) {
                  console.log(pass);
                  if (err) {
                      console.log("Error inserting : %s ", err);
                      return res.redirect("/error?error=" + err)
                  };

                  res.redirect('/login');
                    // if (pass) {
                    //     req.session.user = username;
                    //     return res.redirect('/home');
                    // } else {
                    //     return res.redirect("/login");
                    //     console.log(err);
                    // };
                });
            // };
        });

    });
};

var rolesMap = {
    "ntombi": "admin",
    "nelisa": "admin",
    "zolani": "admin",
    "beauty": "view",
    "neo": "view"
}

var checkUser = function(req, res, next) {
    console.log("checkUser..." + req.path);
    if (req.session.user) {
        return next();
    }

    res.redirect("/login");
};
