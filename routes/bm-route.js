const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const { BM, Report } = require("../models");

router.get("/api/bm", isAuthenticated, (req, res) => {
  BM.findAll({
    where: {
      user_id: req.user.id,
    },
    include: Report,
  }).then((bm) => {
    res.json(bm);
  });
});
/////

router.get("/myentry", isAuthenticated, (req, res) => {
  BM.findAll({
    where: {
     user_id: req.user.id,
    },
    include: Report,
  }).then((dbresults) => {
    const resultsObj = dbresults.map((dbresult) => dbresult.toJSON());

    Report.findAll({
      where: {
      user_id: req.user.id,
      },
    }).then((report) => {
      const reportObj = report.map((report) => {
        switch (report.sleep) {
          case "1":
            report.sleep = "Very Little";
            break;
          case "2":
            report.sleep = "Little";
            break;
          case "3":
            report.sleep = "Moderate";
            break;
          case "4":
            report.sleep = "Good";
            break;
          case "5":
            report.sleep = "Very Good";
            break;
        }
        switch (report.activity) {
          case"1" :
          report.activity ="Very little"
          break;
          case"2":
          report.activity = "Little"
          break;
          case "3":
          report.activity = "Moderate"
          break;
          case "4" :
            report.activity = "Active"
            break;
            case "5" :
              report.activity = "Vigorous"
              break;
        }
        return report.toJSON();
      });
      const results = { BMs: resultsObj, Reports: reportObj };

      //BMs to views
      console.log(results, "ressrersresr");
      ///// getting something... getting arrays

      res.render("report", results);
    });
  });
});

router.post("/api/bm", isAuthenticated, (req, res) => {
  console.log(req.user, "user");
  console.log(req.params.id, "params");
  // this returns undefined..................................
  console.log(req.params, "paramsssss");
  // retuns nothing..

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
    UserId: req.user.id,
    include: Report,
  }).then((bm) => {
    res.json(bm);
  });
});

router.put("/api/bm", isAuthenticated, (req, res) => {
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
