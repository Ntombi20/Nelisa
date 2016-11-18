var checkUser = function(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    else {
      req.flash("errorMsg", "login first to view the app!!!");
      res.redirect("/login");
    }
};

var isAdmin = function(req, res, next) {
  if (req.session.role === 1) {
    return next();
  }
  else {
    req.flash("errorMsg", "logged in as admin to view this page.!");
      res.redirect("/");
  }
};

module.exports.checkUser = checkUser;
module.exports.isAdmin = isAdmin;

module.exports.setupUserDetails = function(req, res, next){
  if (req.session){
    if (req.session.user){
      res.locals.user = req.session.user;
    }

    if (req.session.role){
      res.locals.admin = req.session.role === 1;
    }
  }

  next();
};
