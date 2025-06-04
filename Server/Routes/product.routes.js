const express = require("express");

const Auth = require("../middleware/auth");
const upload = require("../config/multer");
const productcontroller = require("../Controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/createproduct", Auth, upload.fields([{ name: "productImage", maxCount: 10 }]), productcontroller.createProduct);
// delete single post
productRouter.delete("/delete/:userId/:productId", Auth, productcontroller.deleteProduct);
productRouter.patch(
  "/update/:userId/:productId",
  Auth,
  upload.fields([{ name: "productImage", maxCount: 10 }]),
  productcontroller.updateProduct
);

productRouter.get("/getSingleProduct/:productId", productcontroller.getSingleProduct);
productRouter.get("/getallproducts",  productcontroller.getallproducts);



module.exports = productRouter;