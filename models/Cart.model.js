const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product"},
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
