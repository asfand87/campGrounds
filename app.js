var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var commentRoute = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    // for end users.
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log("error", err.message);
});

// for development =========================
// // console.log(process.env.DATABASEURL);
// mongoose.connect("mongodb+srv://Asfand:VbJZG8lZlEQNuMjz@cluster0-hfbjn.mongodb.net/development?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log("connected to DB");
// }).catch(err => {
//     console.log("error", err.message);
// });


//using ejs here so we don't have to type ejs at the end of files.
app.set("view engine", "ejs");
// using body parser package here to get the data out of form.
app.use(bodyParser.urlencoded({ extended: true }));
// here we are connecting our app to the public directory so that we can use our own style sheet if we need.
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// passport Configuration
app.use(require("express-session")({
    secret: "Tola is beauty",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// using middle wear to send req.user to all the templates .
app.use(function(req, res, next) {
    res.locals.currentUser = req.user; // currentUser = is used in header file in partials. so what ever will be passed through res.locals, it will go to all the templates.
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
// User.authenticate() is the method which is comming from passport local mongoose. package.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seeding database.
// seedDB();


// middle wear.



// here we are telling our app to use the routes we have aquired.
// so by adding "/campgrounds" we are drying up code so that in the 
// route files we don't have to say "/campgrounds/new" instead we only say /new and /campgrounds will be appended to it automatically.
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoute);


// app.listen(8080, function() {
//     console.log('Example app listening on port 8080!');
// });
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("connected!!");
})
