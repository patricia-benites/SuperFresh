const express = require("express");
const Order = require("../models/Order.model");
const { authenticate } = require("../middlewares/jwt.middleware");

const router = express.Router();

// Create order

router.post("/", authenticate, async (req, res) => {
    try {
      const newOrder = await Order.create(req.body);
      res.status(200).json(newCOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //  Update user order -? Admin only
  router.put("/:id", authenticate, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
//   //  Delete cart
  
//   router.delete("/:id", authenticate, async (req, res) => {
//     try {
//       await Cart.findByIdAndDelete(req.params.id);
//       res.status(200).json("Cart has been deleted");
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  
//   // / Get cart
  
//   router.get("/find/:userId", authenticate, async (req, res) => {
//     try {
//       const cart = await Cart.findOne({ userId: req.params.userId });
//       res.status(200).json(cart);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  
//   // Get all carts -> Admin only
//   router.get("/find", authenticate, async (req, res) => {
//     try {
//       const carts = await Cart.find();
//       res.status(200).json(carts);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

module.exports = router;