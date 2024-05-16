const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Too short product title"],
            maxlength: [100, "too long title"],
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        priceAfterDiscount: {
            type: Number,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
