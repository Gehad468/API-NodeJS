const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
      userid:
      {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
    required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
    },
        priceAfterDiscount: {
            type: Number,
        },
    
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
        },
        couponApplied: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
