var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    var data = [
       
       {name:"cloud image",
       image :"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2a72d2974bcd_340.jpg",
       description:"lovely picture of mountains.",
       },
       {name:"cloud image",
       image :"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2a72d2974bcd_340.jpg",
       description:"lovely picture of mountains.",
       },
       {name:"cloud image",
       image :"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e5074417c2a72d2974bcd_340.jpg",
       description:"lovely pic of mountains",
       }
       
       ]
    
    
    function seedDB(){
       Campground.deleteMany({},function(err){
       if(err){
          console.log(err);
       }else{
          console.log("campgrounds removed!");
    // data.forEach(function(seed) {
    //     Campground.create(seed, function(err, campground) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log("Campground Added");
    //             // create a comment
    //             Comment.create({
    //                 text: "this place is great, hello world",
    //                 author: "Homer",
    //             }, function(err, comment) {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 else {
    //                     //   console.log(comment);
    //                     campground.comments.push(comment);
    //                     campground.save(function(err) {
    //                         if (err) {
    //                             console.log(err);
    //                         }
    //                         else {
    //                             console.log("comment Created !");
    //                         }
    //                     });

    //                 }
    //             })
    //         }

    //     })
    // })
      }

    });
    }
    
    module.exports = seedDB;