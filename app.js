require("dotenv").config()
const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  mongoStore = require("connect-mongo")(session);
  
// var logger = require("morgan");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/GarageSaleKing";

//requiring models
require("./models/user");
require("./models/garageSale");
require("./models/comment");

//requiring the passport file
require("./services/passport");

//requiring routes
const authRoutes = require("./routes/authRoutes");
const garageSaleRoutes = require("./routes/garageSaleRoutes");

//connecting to the mongo database
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

const app = express();

//allow the create-react-app to be able to communicate with the server in dev mode
app.use(function(req, res, next) {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(logger('dev'));

//setting up app to use express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

//setting up app to use routes from the routes directories
app.use("/auth", authRoutes);

app.get("/api/current_user", (req, res) => {
  var user = req.user;
  res.send({ user });
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/garagesales");
});

app.use(garageSaleRoutes);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //The order matters, make sure app.get(*) is the last route
  app.use(express.static("client/build"));

  //Express will serve up index.html if it doesn't recognize a route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//starting the node server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("GarageSaleKing is online");
});
