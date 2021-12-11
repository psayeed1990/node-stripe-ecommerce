//import express from 'express';
const express = require("express");
const app = express();

//import mongoose
const mongoose = require("mongoose");

//config dotenv
require("dotenv").config();

//set urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import models
const [User, Product, Category, Order] = [
    require("./models/User"),
    require("./models/Product"),
    require("./models/Category"),
    require("./models/Order"),
];

//import routes
const factoryRoutes = require("./routes/factoryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/product", factoryRoutes(Product));
app.use("/api/orders", factoryRoutes(Order));
app.use("/api/categories", factoryRoutes(Category));
app.use("/api/users", userRoutes);

//connect to db
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
