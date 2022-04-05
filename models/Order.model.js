const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
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
  
  const Orde = model("Order", orderSchema);
  
  module.exports = Order;
  