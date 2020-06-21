var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
   // find campground by id
   console.log(req.params.id);
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("comments/new", { campground: campground });
      }
   })
});



//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
         res.redirect("/campgrounds");
      }
      else {
         Comment.create(req.body.comment, function(err, comment) {
            if (err) {
               req.flash("error", "some thing went wrong");
               console.log(err);
            }
            else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success", "Successfully added Comment");
               // console.log(comment);
               res.redirect('/campgrounds/' + campground._id);
               // or can be like this.  res.redirect("/campgrounds/" + req.params._id);
            }
         });
      }
   });
});


// edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
   // req.params.id // refers to /campgrounds/:id
   Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
         res.redirect("back");
      }
      else {
         res.render("edit", { campground_id: req.params.id, comment: foundComment });
      }
   })

})

// comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
      if (err) {
         res.redirect("back");
      }
      else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   })
})


//  delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findOneAndDelete(req.params.comment_id, function(err) {
      if (err) {
         req.flash("error","some thing wen't wrong")
         res.redirect("back");
      }
      else {
         req.flash("success", "Comment delted");
         res.redirect("/campgrounds/" + req.params.id); // req.params.id is campground id
      }
   })
})


//middleware





module.exports = router;


// can also be "/campgrounds/" + campground._id router.post("/", isLoggedIn, function(req, res) {
//  res.redirect("/campgrounds/" + req.params._id);
//           // can also be "/campgrounds/" + campground._id
