const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const { Report } = require("../models");

router.get("/api/members", isAuthenticated, (req, res) => {
  Report.findAll({
    where: {
      user_id: req.user.id,
    },
  }).then((result) => {
    //serialize the data
    result = result.map((result) => result.get({ plain: true }));
    res.json(result);
  });
});

router.get("/myentry", isAuthenticated, (req, res) => {
  Report.findAll({
    where: {
      user_id: req.user.id,
    },
  })
    .then((dbresults) => {
      const results = dbresults.map((result) => result.get({ plain: true }));
      console.log(results);
      res.render("report", results);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/api/members", isAuthenticated, (req, res) => {
  req.body.user_id = req.user.id;
  console.log(req.body);
  Report.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/members/:id", (req, res) => {
  Report.destroy({
    where: {
      id: req.params.id,
    },
  }).then((report) => {
    if (report) {
      return res.json({ success: true });
    }
    res.status(500).json({ success: false });
  });
});
module.exports = router;
