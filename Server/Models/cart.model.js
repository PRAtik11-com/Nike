const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", 
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  size: {
    type: String,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel;
