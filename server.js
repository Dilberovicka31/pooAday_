const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();

const passport = require("./config/passport");

const PORT = process.env.PORT || 8181;
const sequelize = require("./config/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(require("./routes"));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
	sequelize.sync({ force: false });
  });