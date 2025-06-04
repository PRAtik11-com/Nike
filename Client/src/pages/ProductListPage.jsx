import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-high", label: "Price: High-Low" },
  { value: "price-low", label: "Price: Low-High" },
];

const filterSections = [
  {
    title: "Shop By Price",
    key: "price",
    options: ["Under ₹5,000", "₹5,000 - ₹10,000", "₹10,000+"],
  },
  {
    title: "Colour",
    key: "colour",
    options: ["black", "white", "pink", "blue", "yellow"],
  },
  {
    title: "Category",
    key: "category",
    options: ["Men", "Female", "Kids", "All"],
  },
];

const ProductListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState({});

  const getSortQuery = () => {
    switch (sort) {
      case "price-high":
        return { sort: "price", order: "desc" };
      case "price-low":
        return { sort: "price", order: "asc" };
      case "newest":
        return { sort: "createdAt", order: "desc" };
      default:
        return {};
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      if (key === "category" && value === "All") {
        const { category, ...rest } = prev;
        return rest; // don't send category at all
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { sort: s, order } = getSortQuery();
        const params = new URLSearchParams({ limit: 0 });

        if (s) params.append("sort", s);
        if (order) params.append("order", order);
        if (search) params.append("search", search); 

        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key.toLowerCase(), value);
        });

        const url = `${
          import.meta.env.VITE_BaseUrl
        }/product/getallproducts?${params}`;
        const res = await axios.get(url, { withCredentials: true });
        setProducts(res.data.posts || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sort, filters, search]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        {filterSections.map(({ title, key, options }) => (
          <div key={title}>
            <label className="block text-sm font-semibold mb-1">{title}</label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-black"
              value={filters[key] || ""}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            >
              <option value="">Select {title}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </aside>

      <section className="md:col-span-3 space-y-6">
        <div className="flex justify-end">
          <label className="mr-2 text-sm font-semibold">Sort By:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm focus:ring-black"
          >
            {sortOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center">Loading products…</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No products found.
            </div>
          ) : (
            products.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`}>
                <div className="border rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-full h-64 bg-gray-100">
                    <img
                      src={
                        Array.isArray(p.productImage) &&
                        p.productImage[0]?.startsWith("https")
                          ? p.productImage[0]
                          : `${import.meta.env.VITE_imageUrl}/product/${
                              p.productImage?.[0]
                            }`
                      }
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{p.title}</h2>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {p.content}
                    </p>
                    <p className="text-black font-bold mt-2">
                      ₹ {p.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
