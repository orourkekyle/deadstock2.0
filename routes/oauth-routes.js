const router = require("express").Router();
const passport = require("passport");

console.log("HIT: oauth-routes");

function setRedirect() {
    let loginPath = "http://localhost:3001/oauth/google";
    console.log(document.location.hostname)
    if( document.location.hostname  === "https://fathomless-shore-38628.herokuapp.com" ) {
        let loginPath = "https://fathomless-shore-38628.herokuapp.com/oauth/google";
        console.log("inside if: ", loginPath)
        return loginPath
    } else {
        console.log("inside else: ", loginPath)
        return loginPath
    }
}

// auth logout
router
.route("/logout")
.get((req, res) => {
    // let redirectPath = (process.env.NODE_ENV === "production") ? "https://fathomless-shore-38628.herokuapp.com/" : "http://localhost:3000"
    // let redirectPath = "http://localhost:3000"
    req.logout();
    res.redirect(setRedirect);
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
//  let redirectPath = "http://localhost:3000"
// let redirectPath = (process.env.NODE_ENV === "production") ? "https://fathomless-shore-38628.herokuapp.com" : "http://localhost:3000"
redirectPath = `${setRedirect}/profile`;
// redirectPath = `${redirectPath}/search?userId=${req.user.googleId}`
 res.redirect(redirectPath)
})

module.exports = router;