// module with routers
const express = require('express');
const router = express.Router();
const static_r = require("./static");
const dynamic_r = require("./dynamic");
const error = require("./error");
const { join } = require("path");

// set public files
router.use(express.static(join(__dirname, "../../", "public/")));

// set static routers
router.use("/", static_r);

// set dynamic routers
router.use("/api/", dynamic_r);

// error handler
router.use("*", error);

module.exports = router;