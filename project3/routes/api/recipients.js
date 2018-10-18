const router = require("express").Router();
const recipientsController = require("../../controllers/recipientsController");
const secureRoute = require('../../lib/secureRoute');

// Matches with "/api/recipients"
router.route("/")
  .get(secureRoute, recipientsController.findAll)
  .post(recipientsController.create);

// Matches with "/api/recipients/:id"
router.route("/:id")
  .get(recipientsController.findById)
  .put(recipientsController.update)
  .delete(recipientsController.remove);

module.exports = router;
