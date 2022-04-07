const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    size: {
      type: String,
    },
    categories: {
      type: [String],
    },
    season: {
      type: [String],
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
