const router = require("express").Router();
const recipientRoutes = require("./recipients");
const userRoutes = require("./users");

// Recipient routes
router.use("/recipients", recipientRoutes);

// User routes
router.use("/users", userRoutes);

module.exports = router;
