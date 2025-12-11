import  { useState } from "react";
import { useCart } from "../CartContext";
import { useCreateOrderMutation } from "../../../../features/cakes/ordersAPI";
import { toast } from "sonner";

export default function CheckoutPage ()  {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Mobile" >("Cash");
  const [address, setAddress] = useState<string>("");

  const currentUserId = 1; 

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    if (!address) {
      toast.error("Please provide a delivery address.");
      return;
    }

    if (paymentMethod === "Cash") {
      toast.info("You selected Cash on Delivery. Order will be processed.");
    } else if (paymentMethod === "Mobile") {
      toast.info("Simulating Mobile Payment... (Integrate M-Pesa API later)");
    } 

    try {
      for (const item of cart) {
        await createOrder({
          userid: currentUserId,
          DesignID: item.cakeId,
          Price: item.price,
          DeliveryDate: deliveryDate,
          Status: "Pending",
        }).unwrap();
      }
      toast.success("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Checkout</h1>
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Checkout
      </h1>

      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg shadow">
          <label className="block mb-2 font-semibold text-white">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="border bg-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="bg-gray-900 p-4 rounded-lg shadow">
          <label className="block mb-2 font-semibold text-white">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="border bg-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-pink-400"
          >
            <option value="Cash">Cash on Delivery</option>
            <option value="Mobile">Mobile Payment (e.g., M-Pesa)</option>
            <option value="Card">Card Payment</option>
          </select>
        </div>

        <div className="md:col-span-2 bg-gray-900 p-4 rounded-lg shadow">
          <label className="block mb-2 font-semibold text-white">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            className="border bg-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-pink-400 resize-none"
          />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.cakeId}
            className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-white">{item.name}</h2>
              <p className="text-sm text-white">Price: KES {item.price}</p>
              <p className="text-sm text-white">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.cakeId)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      
      <div className="bg-linear-to-r from-pink-500 to-yellow-400 text-white p-4 rounded-lg mb-6 shadow-lg">
        <p className="text-lg font-bold text-center">Total: KES {totalPrice}</p>
      </div>

      
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full mb-4 bg-linear-to-r from-gray-900 to- text-white font-semibold px-4 py-2 rounded transition"
      >
        {isLoading ? "Placing Order..." : "Confirm Checkout"}
      </button>

      
      <button
        onClick={clearCart}
        className="w-full bg-linear-to-r from-blue-400 to-gray-900 text-white font-semibold px-4 py-2 rounded transition"
      >
        Clear Cart
      </button>
    </div>
  );
};


