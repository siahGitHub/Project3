const router = require("express").Router();
const reportsController = require("../../controllers/reportController");

// Matches with "/api/reports"
router.route("/")
  .get(reportsController.getRecipientReport);

  module.exports = router;