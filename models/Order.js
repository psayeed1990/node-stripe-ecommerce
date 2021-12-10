//import mongoose and define schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create schema
var OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

//export model
module.exports = Order = mongoose.model("Order", OrderSchema);
