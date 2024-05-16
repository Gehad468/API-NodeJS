const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    slug: {
        type: String,
        lowercase: true,
    },

    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [4, "Too short password"],
    },
    isVerfied: Boolean,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    address: 
        {
            country: String,
            city: String,
            postalCode: String,
        },
},
    { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;