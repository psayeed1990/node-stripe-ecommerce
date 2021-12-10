//import express from 'express';
const express = require("express");
const app = express();

//config dotenv
require("dotenv").config();

//set urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import models
//import models
const [User, Product, Category, Order] = [
    require("./models/User"),
    require("./models/Product"),
    require("./models/Category"),
    require("./models/Order"),
];

//import routes
const factoryRoutes = require("./routes/factoryRoutes");

app.use("/api/product", factoryRoutes(Product));
app.use("/api/orders", factoryRoutes(Order));
app.use("/api/categories", factoryRoutes(Category));
app.use("/api/users", factoryRoutes(User));

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
