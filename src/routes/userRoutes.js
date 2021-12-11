const express = require("express");
const router = express.Router();
const {
    login,
    registration,
    authenticate,
} = require("./../controllers/userController");

router.route("/login").post(login);
router.route("/registration").post(registration);
router.route("/authenticate").post(authenticate);

module.exports = router;
