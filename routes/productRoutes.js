//import express route and define routes
const express = require("express");
const router = express.Router();

//set product routes
router
    .route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router
    .route("/:id")
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;
