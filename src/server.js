//import express from 'express';
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//import mongoose
const mongoose = require("mongoose");

//config dotenv
require("dotenv").config();
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

//log with morgan
const corsOptions = {
    origin: [
        "localhost:3000",
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://abusayeed.me",
        /\.abusayeed\.me$/,
    ], // the origin of the requests - frontend address
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};

app.use("/api/", cors(corsOptions));
app.options("*", cors(corsOptions));

//use cookie parser
app.use(cookieParser());
//set morgan
app.use(morgan("dev"));

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

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
