import { Outlet, useNavigate } from "react-router"; // ✅ import useNavigate
import Navbar from "../../../components/nav/Navbar";
import { UserDrawer } from "../aside/UserDrawer";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { useState } from "react";
import { useCart } from "../content/CartContext";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate(); // ✅ hook to navigate

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const handleCartToggle = () => setCartOpen((prev) => !prev);

  const goToCheckout = () => {
    navigate("/user/dashboard/checkout"); // ✅ navigate to your checkout route
    setCartOpen(false); // optional: close cart dropdown
  };

  return (
    <div className="relative">
      <Navbar />

      {/* Header with drawer toggle and cart */}
      <div className="flex items-center px-4 py-4 bg-teal-500 text-white relative">
        <button className="mr-4 text-2xl lg:hidden" onClick={handleDrawerToggle}>
          {drawerOpen ? <IoMdClose /> : <FaBars />}
        </button>
        <span className="text-lg text-center font-semibold">
          Welcome✨, Your Sweet Journey Starts Here🧁 Where Every Slice Feels Special 🎂🍰
        </span>

        {/* Cart icon */}
        <div className="ml-auto relative cursor-pointer" onClick={handleCartToggle}>
          <TiShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>

        {/* Cart dropdown */}
        {cartOpen && (
          <div className="absolute right-4 top-14 text-pink-600 bg-gray-900 border shadow-lg p-4 w-80 z-50 max-h-96 overflow-auto">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.cakeId} className="flex justify-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>KES {item.price * item.quantity}</span>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => removeFromCart(item.cakeId)}
                    >
                      x
                    </button>
                  </li>
                ))}
                <li className="font-bold mt-2">Total: KES {totalPrice}</li>
                <li className="mt-2 flex flex-col gap-2">
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-full font-medium"
                    onClick={goToCheckout} // ✅ added handler
                  >
                    Go to Checkout
                  </button>
                  <button
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-full font-medium"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1">
        {/* Sidebar / drawer */}
        <aside
          className={`fixed top-0 z-40 w-64 bg-gray-600 ${drawerOpen ? "" : "hidden"} lg:static lg:block lg:w-64`}
          style={{ minHeight: "100vh" }}
        >
          <div>
            <button
              className="absolute top-4 right-4 text-white text-4xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoMdClose />
            </button>
            <UserDrawer />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-green-200 min-h-screen p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
