const passport = require("passport");
const mongoose = require("mongoose");
const googleStrategy = require("passport-google-oauth20").Strategy;
const twitterStrategy = require("passport-twitter").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
// const keys = require("../config/keys");

const User = mongoose.model("User");

// Passport requires serializeUser/deserializeUser for proper session functionality
passport.serializeUser((createdUser, done) => {
  done(null, createdUser.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID).then(foundUser => {
    done(null, foundUser);
  });
});

// Google strategy setup
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Todo: change this to prepopulate sign up form instead of creating new user immediately
      const foundUser = await User.findOne({ googleID: profile.id });
      if (foundUser) {
        // User already exists with google ID
        return done(null, foundUser);
      }
      const createdUser = await new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleID: profile.id
      }).save();
      done(null, createdUser);
    }
  )
);

// Twitter strategy setup
passport.use(
  new twitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);

// Facebook strategy setup
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
