const {User} = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    id: req.user.id,
  });
});

router.post("/api/signup", (req, res) => {
  // console.log(db);
  // console.log(db.User);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
