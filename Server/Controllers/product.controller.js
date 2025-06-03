const ProductModel = require("../Models/product.model");

const productcontroller = {
  createProduct: async (req, res) => {
   try {
    const { title, content, category, price, size, color } = req.body;
    const userId = req?.user?.id; // ✅ correct based on login token

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const images = req.files?.productImage?.map(file => file.filename) || [];

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

    res.status(201).json({ message: "Product created successfully", product: newProduct });
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
    return res.status(403).json({ message: "You are not authorized to update this product" });
  }

  try {
    const { title, content, category, price, size, color } = req.body;

    const images = req.files?.productImage?.map(file => file.filename) || [];

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

    const updated = await ProductModel.findByIdAndUpdate(productId, { $set: updateData });

    if (!updated) {
      return res.status(400).json({ message: "Error while updating product" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

  getSingleProduct: async (req, res) => {
    const { productId } = req.params;
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
  const limit = req.query.limit || 10;
  const startIndex = req.query.startIndex || 0;
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "asc";
  const search = req.query.search || "";
  const category = req.query.category || ""; 
  const totalProducts = await ProductModel.countDocuments();

  console.log("limit", limit);
  try {
    const filterQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { size: {$regex:search, $options: "i"}}
      ],
    };

  
    if (category && category !== "uncategorized") {
      filterQuery.category = category;
    }

    const posts = await ProductModel.find(filterQuery)
      .limit(limit)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(startIndex);

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      totalProducts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},
};

module.exports = productcontroller;