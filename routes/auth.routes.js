const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { authenticate } = require("../middlewares/jwt.middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (passwordCorrect) {
        const payload = {
          user,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        const { password, ...details } = user._doc;
        res.status(200).json({
          ...details,
          token,
        });
      } else {
        res.status(401).json({ message: "Email or password are incorrect" });
      }
    } else {
      res.status(401).json({ message: "Email or password are incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User -> only for Admin

router.get("/find/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...details } = user._doc;
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users -> only for Admin
router.get("/find", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  Get user stats -. only for Admin

router.get("/stats", authenticate, async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/verify", authenticate, (req, res) => {
  res.status(200).json({
    user: req.jwtPayload.user,
  });
});

module.exports = router;
