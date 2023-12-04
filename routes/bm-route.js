const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const { BM, Report } = require("../models");

router.get("/api/bm", isAuthenticated, (req, res) => {
  BM.findAll({
    where: {
      user_id: req.user.id,
    },
    // include: Report,
  }).then((bm) => {
    res.json(bm);
  });
});
/////

router.get("/myentry", isAuthenticated, (req, res) => {
  //render all BM's and Reports to myentry.handlebars
  BM.findAll({
    where: {
      user_id: req.user.id,
    },
    include: Report,
  }).then((bm) => {
    //serialize the data
    bm = bm.map((bm) => bm.get({ plain: true }));
    console.log(bm);
    res.render("report", { bm });
  }
  ).catch((err) => {
    console.log(err);
    res.status(401).json(err);
  });
}

);

router.post("/api/bm", isAuthenticated, (req, res) => {
  console.log(req.user.id, "user");
  
  // this returns undefined..................................



  BM.create({
    date: req.body.date,
    time: req.body.time,
    style: req.body.style,
    styleRating: req.body.styleRating,
    amount: req.body.amount,
    amountRating: req.body.amountRating,
    speed: req.body.speed,
    speedRating: req.body.speedRating,
    comfort: req.body.comfort,
    comfortRating: req.body.comfortRating,
    user_id: req.user.id,
    include: Report,
  }).then((bm) => {
    console.log(bm);
    res.json(bm);
  });
});

router.put("/api/bm/:id", isAuthenticated, (req, res) => {
  console.log(req.body);
  BM.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then((bm) => {
    res.json(bm);
  });
});

router.delete("/api/bm/:id", (req, res) => {
  BM.destroy({
    where: {
      id: req.params.id,
    },
  }).then((bm) => {
    if (bm) {
      return res.json({ success: true });
    }
    res.status(500).json({ success: false });
  });
});

module.exports = router;
