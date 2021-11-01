const SiteController = require('../app/controllers/SiteController');
const express = require("express");
const router = express.Router();

router.get('/about', function (req, res) {
    res.send('About birds')
  })
router.get('/payment',SiteController.payment);
router.get('/login',SiteController.login);
router.get('/register',SiteController.register);
router.get('/',SiteController.index);

module.exports = router;