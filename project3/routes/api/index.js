const router = require("express").Router();
const recipientRoutes = require("./recipients");
const recipientItemsRoutes = require("./recipientItems");
const userRoutes = require("./users");
const reportRoutes = require("./report");
//const authRoutes = require("../auth");

// Recipient routes
router.use("/recipients", recipientRoutes);

// Recipient routes
router.use("/recipientItems", recipientItemsRoutes);

// User routes
router.use("/users", userRoutes);

//Report routes
router.use("/reports", reportRoutes);

//Authentication routes
//router.use("auth/", authRoutes);

module.exports = router;
