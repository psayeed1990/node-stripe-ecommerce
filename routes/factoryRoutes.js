//import express route and define routes
const express = require("express");
const router = express.Router();
const factoryController = require("../controllers/factoryController");
module.exports = (routename) => {
    //set user routes
    router
        .route("/")
        .get(factoryController.getAll(routename))
        .post(factoryController.createOne(routename));

    router
        .route("/:id")
        .get(factoryController.getOne(routename))
        .patch(factoryController.updateOne(routename))
        .delete(factoryController.deleteOne(routename));

    return router;
};
