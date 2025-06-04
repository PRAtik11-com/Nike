const ProductModel = require("../Models/product.model");
const mongoose = require("mongoose");

const productcontroller = {
  createProduct: async (req, res) => {
    try {
      const { title, content, category, price, size, color } = req.body;
      const userId = req?.user?._id;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      const images =
        req.files?.productImage?.map((file) => file.filename) || [];

      const newProduct = await ProductModel.create({
        userId,
        title,
        content,
        productImage: images,
        category,
        price,
        size: Array.isArray(size) ? size : [size],
        color: Array.isArray(color) ? color : [color],
      });

      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Create Product error:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // delete post

  deleteProduct: async (req, res) => {
    const { productId, userId } = req.params;

    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    try {
      const product = await ProductModel.findByIdAndDelete(productId);

      if (!product) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // update post

  updateProduct: async (req, res) => {
    const { productId, userId } = req.params;

    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    try {
      const { title, content, category, price, size, color } = req.body;

      const images =
        req.files?.productImage?.map((file) => file.filename) || [];

      const updateData = {
        title,
        content,
        category,
        price,
        size: Array.isArray(size) ? size : [size],
        color: Array.isArray(color) ? color : [color],
      };

      if (images.length > 0) {
        updateData.productImage = images;
      }

      const updated = await ProductModel.findByIdAndUpdate(productId, {
        $set: updateData,
      });

      if (!updated) {
        return res
          .status(400)
          .json({ message: "Error while updating product" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSingleProduct: async (req, res) => {
    const { productId } = req.params;
    console.log("Received productId:", productId);
    console.log("Valid ID?", mongoose.Types.ObjectId.isValid(productId));

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post fetched successfully", product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getallproducts: async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;
    const search = req.query.search || "";
    const category = req.query.category || "";

    try {
      const filterQuery = {
        $and: [
          {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { content: { $regex: search, $options: "i" } },
            ],
          },
        ],
      };

      if (category && category !== "uncategorized") {
        filterQuery.category = category;
      }

      // Handle price filter
      const price = req.query.price;
      if (price) {
        if (price === "Under ₹5,000") {
          filterQuery.$and.push({ price: { $lt: 5000 } });
        } else if (price === "₹5,000 - ₹10,000") {
          filterQuery.$and.push({ price: { $gte: 5000, $lte: 10000 } });
        } else if (price === "₹10,000+") {
          filterQuery.$and.push({ price: { $gt: 10000 } });
        }
      }

      // Handle colour filter
      const colour = req.query.colour;
      if (colour) {
        filterQuery.$and.push({ color: colour });
      }

      const posts = await ProductModel.find(filterQuery)
        .sort({ [sort]: order })
        .skip(startIndex)
        .limit(limit);

      const totalProducts = await ProductModel.countDocuments(filterQuery);

      if (!posts.length) {
        return res
          .status(200)
          .json({ message: "No posts found", posts: [], totalProducts: 0 });
      }

      res
        .status(200)
        .json({ message: "Posts fetched successfully", posts, totalProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = productcontroller;
