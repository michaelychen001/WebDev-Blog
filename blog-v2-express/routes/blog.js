var express = require('express');
var router = express.Router();

/* GET blog listing. */
router.get('/list', function(req, res, next) {
  res.json({
    errno: 0,
    data: [1, 2, 3]
  });
});

module.exports = router;
