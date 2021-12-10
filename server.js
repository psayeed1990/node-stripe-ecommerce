//import express from 'express';
const express = require("express");
const app = express();

//config dotenv
require("dotenv").config();

//set urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

//set routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
