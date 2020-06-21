var express = require("express"),
   router = express.Router();
var passport = require("passport");
var User = require("../models/user");










// Root Route
router.get("/", function(req, res) {
   res.render("landing");
});

// ==================================== Auth Routes========================================\\
// Show  Register form.

router.get("/register", function(req, res) {
   res.render("register");
})

// handle sign up logic
router.post("/register", function(req, res) {
   var newUser = new User({ username: req.body.username });
   User.register(newUser, req.body.password, function(err, user) {
      // here err which is comming from passport and it contains user name already taken or passwrod can't be blank or etc etc.
      if (err) {
         // console.log(err);
         
         // req.flash("error", err);
         req.flash("error", err.message);
         return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
         req.flash("success", "Welcome to YelpCamp" + user.username);
         res.redirect("/campgrounds");
      })
   })
})


// log in route

router.get("/login", function(req, res) {
   // res.render("login",{message: req.flash("error")}); we will pass it from app.js through res.locals.message.
   res.render("login");
})

router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login",
   
}), function(req, res) {

})

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success","Successfully Logged Out");
   res.redirect("/campgrounds");
})



module.exports = router;
