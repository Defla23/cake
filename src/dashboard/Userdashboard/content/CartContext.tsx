import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { readycakes } from "../../../features/cakes/readycakeApi";
import type { Design } from "../../../features/cakes/designsApi";

type CartItem = {
  cakeId: number; // readycakes cakeId or DesignID
  name: string;   // cakeName or DesignName
  price: number;
  quantity: number;
  imageURL?: string;
  isCustomDesign?: boolean;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (cake: readycakes) => void;
  addDesignToCart: (design: Design) => void;
  removeFromCart: (cakeId: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add ready-made cake to cart
  const addToCart = (cake: readycakes) => {
    setCart(prev => {
      const existing = prev.find(item => item.cakeId === cake.cakeId);
      if (existing) {
        return prev.map(item =>
          item.cakeId === cake.cakeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev, 
        { 
          cakeId: cake.cakeId, 
          name: cake.cakeName, 
          price: cake.price, 
          quantity: 1, 
          imageURL: cake.imageURL 
        }
      ];
    });
  };

  // Add custom design to cart with automatic price based on size
  const addDesignToCart = (design: Design) => {
    const getPrice = (size?: string) => {
      switch (size?.toLowerCase()) {
        case "small": return 1000;
        case "medium": return 2000;
        case "large": return 3000;
        default: return 0;
      }
    };

    const price = getPrice(design.Size);

    setCart(prev => {
      const existing = prev.find(item => item.cakeId === design.DesignID);
      if (existing) {
        return prev.map(item =>
          item.cakeId === design.DesignID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev, 
        { 
          cakeId: design.DesignID, 
          name: design.DesignName, 
          price, 
          quantity: 1, 
          imageURL: design.ImageUrl, 
          isCustomDesign: true 
        }
      ];
    });
  };

  // Remove an item from cart
  const removeFromCart = (cakeId: number) => {
    setCart(prev => prev.filter(item => item.cakeId !== cakeId));
  };

  // Clear the cart
  const clearCart = () => setCart([]);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, addDesignToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
