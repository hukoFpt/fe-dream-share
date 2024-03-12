import React, { createContext, useState, useContext, useEffect } from "react";

interface CartItem {
  id: number;
  label: string;
  collection: string;
  price: number;
  quantity: number;
}
interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  updateQuantity: (item: any, quantity: number) => void;
}

// Create the context
const CartContext = createContext<CartContextData | undefined>(undefined);

// Create the provider component
const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    // Get the cart items from local storage when initializing the state
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    }
  });

  useEffect(() => {
    // Save the cart items in local storage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: any) => {
    console.log("Adding item to cart", item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item is already in the cart, increment its quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      return prevItems.filter((i) => i.id !== item.id);
    });
  };
  const updateQuantity = (item: any, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((i) => (i.id === item.id ? { ...i, quantity } : i))
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
