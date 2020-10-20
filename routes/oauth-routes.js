const router = require("express").Router();
const passport = require("passport");

console.log("HIT: oauth-routes");

// auth logout
router
.route("/logout")
.get((req, res) => {
    let redirectPath = (process.env.NODE_ENV === "production") ? "https://deadstock2.herokuapp.com" : "http://localhost:3000"
    req.logout();
    res.redirect(redirectPath);
});

// auth with google
// this route matches: http://localhost:3001/auth/google
router
.route('/google')
.get(passport.authenticate("google", {
    scope: ["profile"]
}),(req, res) => {
    console.log("hitting /google route");
} );


const authCheck = (req, res, next) => {
    console.log("req.user: ", req);
    if(!req.user){
        // if user is NOT logged in
        res.redirect("/oauth/login");
        // res.redirect("/singup");
    }else {
        // if user IS logged in
        next();
    }
};


// cb route for google to redirect to
router
.route('/google/redirect')
.get(passport.authenticate("google"), (req, res) => {
    console.log("req inside redirect route:", req.hostname);
    let redirectPath = (process.env.NODE_ENV === 'production') ? 'https://deadstock2.herokuapp.com' : 'http://localhost:3000'
    redirectPath = `${redirectPath}/profile`;
    // redirectPath = `${redirectPath}/profile?userId=${req.user.googleId}`
    res.redirect(redirectPath, authCheck, { user: req.user })
})

module.exports = router;