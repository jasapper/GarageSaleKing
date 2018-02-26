const express = require("express");
const passport = require("passport");

const router = express.Router();

//google authentication routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/garagesales");
});

//twitter authentication routes
router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    res.redirect("/garagesales");
  }
);

//facebook authentication routes
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/garagesales");
  }
);

module.exports = router;
