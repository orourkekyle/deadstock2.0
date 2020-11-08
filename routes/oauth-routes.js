const router = require("express").Router();
const passport = require("passport");

console.log("HIT: oauth-routes");

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
    console.log("this is req.user inside /login/success: ", req.user);
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

// when login failed, send msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate"
    });
});

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
    // console.log("req.hostname inside redirect route:", req.hostname);
    let redirectPath = (process.env.NODE_ENV === 'production') ? 'https://deadstock2.herokuapp.com' : 'http://localhost:3000'
    redirectPath = `${redirectPath}/profile`;
    // redirectPath = `${redirectPath}/profile?userId=${req.user.googleId}`
    res.redirect(redirectPath);
    
})

module.exports = router;