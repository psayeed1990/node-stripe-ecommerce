//import express from 'express';
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const unless = require("express-unless");
const app = express();

//enable proxy
app.enable("trust-proxy");
//use cookie parser
app.use(cookieParser());
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
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Content-Disposition",
        "Content-Length",
        "X-Requested-With",
        "Origin",
        "Accept-Encoding",
        "Accept-Language",
        "Host",
        "Referer",
        "User-Agent",
        "DNT",
        "Cache-Control",
        "Cookie",
        "Connection",
        "Upgrade-Insecure-Requests",
    ],
};

app.use("/api/", cors(corsOptions));
app.options("*", cors(corsOptions));

//set morgan
app.use(morgan("dev"));

//set urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import models
const [Product, Category, Order] = [
    require("./models/Product"),
    require("./models/Category"),
    require("./models/Order"),
];

//import routes
const factoryRoutes = require("./routes/factoryRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

app.use("/api/users", userRoutes);

//use express-unless to serve routes
app.use("/api/categories", categoryRoutes(Category));

app.use("/api/products", productRoutes(Product));

app.use("/api/orders", ordersRoutes(Order));

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
