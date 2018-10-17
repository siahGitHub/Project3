const router = require("express").Router();
const recipientRoutes = require("./recipients");
const userRoutes = require("./users");
const reportRoutes = require("./report");

// Recipient routes
router.use("/recipients", recipientRoutes);

// User routes
router.use("/users", userRoutes);

//Report routes
router.use("/reports", reportRoutes);

module.exports = router;
