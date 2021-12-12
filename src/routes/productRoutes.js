//import express route and define routes
const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    createOne,
    deleteOne,
} = require("../controllers/factoryController");

const { protect } = require("./../controllers/userController");

module.exports = (Model) => {
    //set user routes
    router.route("/").get(getAll(Model)).post(protect, createOne(Model));

    router
        .route("/:id")
        .get(getOne(Model))
        .patch(protect, updateOne(Model))
        .delete(protect, deleteOne(Model));

    return router;
};
