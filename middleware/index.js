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
  if (req.session.user.admin) {
    return next();
  }
  else {
    req.flash("errorMsg", "can't access!!!");
      res.redirect("/");
  }
};
module.exports.checkUser = checkUser;
module.exports.isAdmin = isAdmin;
