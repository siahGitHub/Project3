const router = require("express").Router();
const authController = require("../controllers/authController");
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/editProfile')
  .put(secureRoute, authController.updateUserRoute);

router.route('/user')
  .get(secureRoute, authController.showUserRoute);

module.exports = router;