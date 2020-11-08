const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// external api routes
router.use("/api", apiRoutes);

// default route
// router.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/public/index.html"));
//   });

// default deployed route
// if (process.env.NODE_ENV === 'production') {
//   router.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build/index.html'))
//   })
// }
if (process.env.NODE_ENV === 'production') {
  router.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  })
}

module.exports = router;