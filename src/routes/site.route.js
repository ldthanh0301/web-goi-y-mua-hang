const SiteController = require('../app/controllers/SiteController');
const AuthController = require('../app/controllers/AuthController');
const express = require("express");
const router = express.Router();

router.get('/about', function (req, res) {
    res.send('About birds')
  })
// router.get('/payment',SiteController.payment);
router.get('/',SiteController.index);
router.get('/login',SiteController.login);
router.get('/register',SiteController.register);
// router.get('/login',UserController.login)
router.get('/logout',AuthController.logoutUser)
router.post('/login',AuthController.confirmUserLogin)

module.exports = router;