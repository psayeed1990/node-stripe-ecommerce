//import mongoose and define the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//import bcrypt
const bcrypt = require("bcryptjs");

//setup user schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    role: {
        //type enum
        type: String,
        enum: ["user", "admin"],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

//hash the password before saving
UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
user.password;

//export UserSchema
module.exports = User = mongoose.model("User", UserSchema);
