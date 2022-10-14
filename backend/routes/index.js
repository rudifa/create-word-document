let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express hic et nunc' });
  // 'index' is the name of the view file, views/index.jade
  // per app.set("view engine", "jade");
});

module.exports = router;
