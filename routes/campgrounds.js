var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
   // Get all campgrounds from DB
   Campground.find({}, function(err, allCampgrounds) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("campgrounds/index", { campgrounds: allCampgrounds });
      }
   });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   
   var author = {
      id: req.user._id,
      username: req.user.username
   }
   var newCampground = { name: name, image: image, description: desc, author: author, price:price };
   // Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
         console.log("creation route error " + err);
      }
      else {
         //redirect back to campgrounds page
         // console.log(newlyCreated);
         res.redirect("/campgrounds");
      }
   });
});



// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
   //find the campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
      if (err) {
         console.log(err);
      }
      else {
         // console.log("show found campground in console" + foundCampground)
         //render show template with that campground
         res.render("campgrounds/show", { campground: foundCampground });
      }
   });
});


// Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
         
         console.log(err);
      }
      else {
         
         res.render("campgrounds/edit", { campground: foundCampground });
      }




   });


});

//Update Campground route

router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
   //  method changed findByIdAndUpdate
   Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
      if (err) {
         res.redirect("/campgrounds");
      }
      else {
         res.redirect("/campgrounds/" + updatedCampground.id);
      }
   })
})

// Delete Route
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
   //  method changed findByIdAndRemove

   Campground.findOneAndDelete(req.params.id, function(err) {
      if (err) {
         console.log(err);
         res.redirect("/campgrounds");
      }
      else {
         res.redirect("/campgrounds");
      }
   })
})






module.exports = router;
