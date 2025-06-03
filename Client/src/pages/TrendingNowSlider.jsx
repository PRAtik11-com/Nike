import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const TrendingNowSlider = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BaseUrl}/product/getallproducts`,
          {
            withCredentials: true,
          }
        );
        console.log("Response data:", response.data);

        if (Array.isArray(response.data.posts)) {
          setTrendingProducts(response.data.posts);
        } else {
          throw new Error("Invalid data format received from server");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? trendingProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === trendingProducts.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (trendingProducts.length === 0)
    return <div className="text-center py-12">No trending products found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trending Now</h1>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {trendingProducts.map((product) => (
              <Link
                // to={`/product/${product._id || product.id}`}
                key={product._id || product.id}
                className="w-full flex-shrink-0 px-4 block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                      <img
                        src={
                          Array.isArray(product.productImage) &&
                          product.productImage[0]?.startsWith("https")
                            ? product.productImage[0]
                            : `${import.meta.env.VITE_imageUrl}/product/${
                                product.productImage?.[0]
                              }`
                        }
                        alt={product.title}
                        className="w-full h-64 md:h-96 object-contain p-4"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300";
                        }}
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{product.content}</p>
                      <p className="text-lg font-semibold mb-6">
                        ₹ {product.price?.toLocaleString("en-IN") || "N/A"}
                      </p>
                      <button className="self-start px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {trendingProducts.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
              aria-label="Previous"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
              aria-label="Next"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingNowSlider;
