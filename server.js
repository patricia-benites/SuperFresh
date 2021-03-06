const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/products", productRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/carts", cartRoutes);

const stripeRoutes = require("./routes/stripe");
app.use("/stripe", stripeRoutes);

app.listen(process.env.PORT || 4000);
