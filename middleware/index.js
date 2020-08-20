var Campground = require("../models/campground.js"),
    Comment = require("../models/comment.js");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnerShip = function(req, res, next) {
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, foundCampground) {
         if (err) {
            res.redirect("/campgrounds");
         }
         else {
            // does the user own the campground
            if (foundCampground.author.id.equals(req.user._id)) {
               next();
            }
            else {
               res.redirect("back");
            }

         }
      })
   }
   else {
      // console.log("you need to be logged in");
      res.redirect("back");
   }
}


middlewareObj.checkCommentOwnership = function(req, res, next) {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, foundComment) {
         if (err) {
            req.flash("error", "Campgrounds not found");
            res.redirect("/campgrounds");
         }
         else {
            // does the user own the Comment
            if (foundComment.author.id.equals(req.user._id)) {
               next();
              
            }
            else {
               req.flash("error", "You don't have permission to do that")
               res.redirect("back");
            }

         }
      })
   }
   else {
      req.flash("error", "You need to be logged in to do that");
      // console.log("you need to be logged in");
      res.redirect("back");
   }
}


//middleware
middlewareObj.isLoggedIn = function(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   req.flash("error", "You need to be logged in to do that");
   res.redirect("/login");
}

module.exports = middlewareObj;
