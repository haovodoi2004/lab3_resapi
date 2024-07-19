var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { data: 'MD18402' , point : 10 });
});

module.exports = router;
