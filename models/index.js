const User = require("./user");
const BM = require("./bm");
const Report = require("./report");

BM.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(BM, {
  foreignKey: "user_id",
});

Report.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Report, {
  foreignKey: "user_id",
});
//associate report with BM through table 

Report.belongsToMany(BM, {
  through: "report_bm",
  foreignKey: "report_id",
});

BM.belongsToMany(Report, {
  through: "report_bm",
  foreignKey: "bm_id",
});






module.exports = { User, BM, Report };
