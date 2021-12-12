const express = require("express");
const router = express.Router();
const {
    login,
    logout,
    registration,
} = require("../controllers/userController");

router.route("/login").post(login);
router.route("/registration").post(registration);

module.exports = router;
