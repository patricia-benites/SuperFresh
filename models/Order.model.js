const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    products: [
      {
        productId: mongoose.SchemaTypes.ObjectId,
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Orde = model("Order", orderSchema);

module.exports = Order;
