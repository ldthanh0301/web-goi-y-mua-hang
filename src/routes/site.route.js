const express = require("express");
const SiteController = require('../app/controllers/SiteController');
const router = express.Router();

router.get('/about', function (req, res) {
    res.send('About birds')
  })
router.get('/payment',SiteController.payment);
router.get('/',SiteController.index);

module.exports = router;