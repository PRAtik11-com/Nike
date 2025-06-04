const CartModel = require("../Models/cart.model");
const mongoose = require('mongoose');


const cartcontroller = {
   addCart : async (req, res) =>{
    const { productId, quantity, size } = req.body;
  const userId =req.user._id

  try {
    let cart = await CartModel.findOne({ user: userId });

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    } else {
      cart = new CartModel({
        user: userId,
        items: [{ product: productId, quantity, size }],
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err });
  }
},
   getcart: async (req, res) => {
  try {
    console.log("User in getcart:", req.user);

    if (!req.user?._id) {
      return res.status(400).json({ message: "User ID missing in request" });
    }

    // Ensure req.user._id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const cart = await CartModel.findOne({ user: new mongoose.Types.ObjectId(req.user._id) }).populate("items.product");
    
    console.log("Cart found:", cart);
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error in getcart:", err);
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
},
removeItemFromCart :async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Remove item by _id from user's cart
    const updatedCart = await CartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate("items.product");

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart", error });
  }
},

updateCartItemQuantity :async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, quantity } = req.body;

    if (!itemId || typeof quantity !== "number") {
      return res.status(400).json({ message: "itemId and quantity are required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    await cart.populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ message: "Failed to update cart item quantity", error });
  }
}
}

module.exports = cartcontroller