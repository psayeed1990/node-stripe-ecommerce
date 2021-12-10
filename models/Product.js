//import mongoose and define schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create schema
var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        //references the category model
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    image: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

//export Product model
module.exports = Product = mongoose.model("Product", ProductSchema);
