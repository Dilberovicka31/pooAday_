module.exports = function (req, res, next) {
  if (req.user) {
    return next();
  }
  // return res.status(500).json({success: false});

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/login");
};
