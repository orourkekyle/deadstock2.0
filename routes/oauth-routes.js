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

// cb route for google to redirect to
router
.route('/google/redirect')
.get(passport.authenticate("google"), (req, res) => {
    console.log("req inside redirect route:", req.hostname);
    let redirectPath = (process.env.NODE_ENV === 'production') ? 'https://deadstock2.herokuapp.com' : 'http://localhost:3000'
    redirectPath = `${redirectPath}/profile`;
    // redirectPath = `${redirectPath}/search?userId=${req.user.googleId}`
    res.redirect(redirectPath)
})

module.exports = router;