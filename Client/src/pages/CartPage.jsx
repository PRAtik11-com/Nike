import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/cart/getcart`,
        {
          withCredentials: true,
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCart({ message: "Failed to fetch cart" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete item handler
  const handleDelete = async (itemId, currentQuantity) => {
  try {
    if (currentQuantity > 1) {
      // Reduce quantity by 1
      await axios.post(
        `${import.meta.env.VITE_BaseUrl}/cart/updateCartItemQuantity`,
        {
          itemId,
          quantity: currentQuantity - 1,
        },
        { withCredentials: true }
      );
    } else {
      // Quantity is 1, remove the whole item
      await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/cart/removeItemFromCart/${itemId}`,
        { withCredentials: true }
      );
    }
    fetchCart(); // Refresh cart after update/delete
  } catch (error) {
    console.error("Failed to update or delete item", error);
    alert("Failed to update or delete item");
  }
};


  // Add quantity handler (+ button)
  const handleAddQuantity = async (itemId, currentQuantity) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BaseUrl}/cart/updateCartItemQuantity`,
        {
          itemId,
          quantity: currentQuantity + 1,
        },
        { withCredentials: true }
      );
      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error("Failed to update quantity", error);
      alert("Failed to update quantity");
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (!cart || cart.message === "Cart is empty") {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  const items = cart.items || [];
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryCharge = 1250;
  const total = subtotal + deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Bag Items */}
      <div className="md:col-span-2 space-y-10">
        <h2 className="text-3xl font-bold">Bag</h2>
        {items.map((item) => (
          <div key={item._id} className="flex items-start gap-6">
            <img
              src={
                item.product.productImage[0]?.startsWith("https")
                  ? item.product.productImage[0]
                  : `${import.meta.env.VITE_imageUrl}/product/${item.product.productImage[0]}`
              }
              alt={item.product.title}
              className="w-40 h-40 object-contain"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">{item.product.title}</h3>
              <p className="text-gray-500">{item.product.content}</p>
              <p className="text-gray-500">Size {item.size}</p>
              <div className="flex items-center gap-4">
               <button onClick={() => handleDelete(item._id, item.quantity)}>🗑️</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAddQuantity(item._id, item.quantity)}>➕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border p-6 rounded-lg bg-gray-50 space-y-6">
        <h3 className="text-2xl font-bold">Summary</h3>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Delivery & Handling</span>
          <span>₹ {deliveryCharge.toLocaleString("en-IN")}</span>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹ {total.toLocaleString("en-IN")}</span>
        </div>
        <button className="w-full py-3 bg-black text-white rounded-full font-semibold">
          Guest Checkout
        </button>
        <button className="w-full py-3 bg-black text-white rounded-full font-semibold">
          Member Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
