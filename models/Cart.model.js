const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    },
    status: {
        type: String
    },
    products: [{productId: mongoose.SchemaTypes.ObjectId, quantity: Number}]
  });
  
  const Cart = model("Cart", cartSchema);
  
  module.exports = Cart;
  