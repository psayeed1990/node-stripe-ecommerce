//import express from 'express';
const express = require("express");
const app = express();

//config dotenv
require("dotenv").config();

//set urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
