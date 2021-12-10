//import express route and define routes
const express = require("express");
const router = express.Router();
const factoryController = require("../controllers/factoryController");
module.exports = (Model) => {
    //set user routes
    router
        .route("/")
        .get(factoryController.getAll(Model))
        .post(factoryController.createOne(Model));

    router
        .route("/:id")
        .get(factoryController.getOne(Model))
        .patch(factoryController.updateOne(Model))
        .delete(factoryController.deleteOne(Model));

    return router;
};
