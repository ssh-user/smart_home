// module with static routes.
const router = require('express').Router();
const passport = require("passport");
const { join } = require("path");
const pathToView = join(__dirname, "../", "view/");
const pathToPublic = join(__dirname, "../../", "public/");

// only for registred users. Main SPA page build with react.
router.get('/', isLoggedIn, (req, res) => {
    res.sendFile(pathToView + "home.html");
});

// only one public page.
router.get('/login', (req, res) => {
    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.sendFile(pathToView + "login.html");
});

// if USERNAME and PASSWORD right - allow access to site.
router.post("/login", passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


module.exports = router;


// prohibits unauthorized access for static page.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};