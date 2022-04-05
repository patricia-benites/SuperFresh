const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
      type: String
  },
  picture: {
      type: String
  },
  categories: {
      type:[String]
  },
  season: {
      type: [String]
  }, 
  price: {
      type: Number
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
