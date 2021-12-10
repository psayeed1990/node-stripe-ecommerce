//import express route and define routes
const express = require("express");
const router = express.Router();

//set oder routes
router
    .route("/")
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

router
    .route("/:id")
    .get(orderController.getOrder)
    .patch(orderController.updateUrder)
    .delete(orderController.deleteOrder);

module.exports = router;
