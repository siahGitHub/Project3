const router = require("express").Router();
const recipientsItemsController = require("../../controllers/recipientItemsController");

// Matches with "/api/recipients"
router.route("/")
  .get(recipientsItemsController.findAll)
  .post(recipientsItemsController.create);

// Matches with "/api/recipients/:id"
router.route("/:id")
  .get(recipientsItemsController.findById)
  .put(recipientsItemsController.update)
  .delete(recipientsItemsController.remove);

module.exports = router;