import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDescription = () => {
  const { productId } = useParams();
  console.log(productId);
  const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
   const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BaseUrl
          }/product/getSingleProduct/${productId}`
        );
        setProduct(res.data.product);
        setSelectedImage(
          res.data.product.productImage?.[0]?.startsWith("https")
            ? res.data.product.productImage[0]
            : `${import.meta.env.VITE_imageUrl}/product/${
                res.data.product.productImage?.[0]
              }`
        );
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

   const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BaseUrl}/cart/addcart`,
        {
          productId: product._id,
          quantity: 1,
          size: selectedSize,
        },
        {
          withCredentials: true,
        }
      );

      alert("Product added to cart!");
      navigate("/cartpage");  // <-- Navigate here
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Images */}
      <div className="flex gap-4">
        <div className="flex flex-col space-y-2">
          {product.productImage.map((img, index) => {
            const src = img.startsWith("https")
              ? img
              : `${import.meta.env.VITE_imageUrl}/product/${img}`;
            return (
              <img
                key={index}
                src={src}
                alt="thumb"
                onClick={() => setSelectedImage(src)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                  selectedImage === src ? "border-black" : "border-gray-300"
                }`}
              />
            );
          })}
        </div>
        <div className="flex-1">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[500px] object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 text-lg">{product.content}</p>
        <p className="text-xl font-semibold">
          MRP : ₹ {product.price?.toLocaleString("en-IN")}
        </p>
        <p className="text-sm text-gray-500">Inclusive of all taxes</p>

        <div>
          <label className="text-sm font-semibold mb-2 block">
            Select Size
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {[
              "UK 6 (EU 40)",
              "UK 6.5",
              "UK 7",
              "UK 7.5",
              "UK 8",
              "UK 8.5",
              "UK 9",
              "UK 9.5",
              "UK 10",
              "UK 10.5",
              "UK 11",
              "UK 11.5",
              "UK 12",
            ].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border rounded-md py-2 px-4 text-sm ${
                  selectedSize === size
                    ? "border-black font-semibold"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!selectedSize}
          onClick={handleAddToCart}
          className={`mt-4 w-full py-3 text-white font-bold rounded-md transition ${
            selectedSize
              ? "bg-black hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
