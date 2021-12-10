//import express route and define routes
const express = require("express");
const router = express.Router();

//set category routes
router
    .route("/")
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);

router
    .route("/:id")
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;
