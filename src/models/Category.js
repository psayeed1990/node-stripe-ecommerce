//import mongoose and define schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create schema
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

//export model
module.exports = Category = mongoose.model("Category", CategorySchema);
