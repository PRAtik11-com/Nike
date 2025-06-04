const express = require("express");

const Auth = require("../middleware/auth");
const cartcontroller = require("../Controllers/cartController");

const cartRouter = express.Router()


cartRouter.get("/getcart", Auth, cartcontroller.getcart)
cartRouter.post("/addcart", Auth, cartcontroller.addCart)
cartRouter.delete("/removeItemFromCart/:itemId", Auth, cartcontroller.removeItemFromCart)
cartRouter.post("/updateCartItemQuantity", Auth, cartcontroller.updateCartItemQuantity)

module.exports = cartRouter