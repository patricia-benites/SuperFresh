const express = require("express");
const Cart = require("../models/Cart.model");
const { authenticate } = require("../middlewares/jwt.middleware");

const router = express.Router();

// Create cart

router.post("/", authenticate, async (req, res) => {
    try {
      const newCart = await Cart.create(req.body);
      res.status(200).json(newCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //  Update cart
  router.put("/:id", authenticate, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
//   //  Delete product -> Admin only
  
//   router.delete("/:id", authenticate, async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.status(200).json("Product has been deleted");
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  
//   // / Get Product
  
//   router.get("/find/:id", async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
//       res.status(200).json(product);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  
//   // Get all products ->
//   router.get("/find", async (req, res) => {
//     const qCategory = req.query.category;
  
//     let products;
//     try {
//       if (qCategory) {
//         products = await Product.find({
//           categories: {
//             $in: [qCategory],
//           },
//         });
//       } else {
//         products = await Product.find();
//       }
  
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });


module.exports = router;