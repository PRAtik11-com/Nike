const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    productImage: [String],
    category: {
      type: String,
      default: "uncategorized",
    },
    price:{
        type:Number,
    },
    size:[String],
    color:[String]
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
