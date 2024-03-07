var express = require('express');
var router = express.Router();

// 处理表单提交
router.post('/', function(req, res, next) {
  const url = req.body.url;
  res.redirect(url);
});

module.exports = router;

