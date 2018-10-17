const router = require("express").Router();
const recipientsController = require("../../controllers/recipientsController");

// Matches with "/api/recipients"
router.route("/")
  .get(recipientsController.findAll)
  .post(recipientsController.create);

// Matches with "/api/recipients/:id"
router.route("/:id")
  .get(recipientsController.findById)
  .put(recipientsController.update)
  .delete(recipientsController.remove);

module.exports = router;
