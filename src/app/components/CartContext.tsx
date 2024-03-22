import React, { createContext, useState, useContext, useEffect } from "react";

// Define the shape of the context
interface CartContextData {
  cartItems: any[];
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

  const addToCart = (itemToAdd: { id: any }) => {
    // Get the current cart items from localStorage
    const currentCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    // Check if the item already exists in the cart
    const existingItem = currentCartItems.find(
      (item) => item.id === itemToAdd.id
    );
    let updatedCartItems;
    if (existingItem) {
      // If the item already exists, increase its quantity by one
      updatedCartItems = currentCartItems.map((item) =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If the item doesn't exist, add it to the cart with a quantity of one
      updatedCartItems = [...currentCartItems, { ...itemToAdd, quantity: 1 }];
    }
    // Update the 'cartItems' item in localStorage with the updated cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // Update the cartItems state
    setCartItems(updatedCartItems);
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
    let updatedCartItems;
    // Update the 'cartItems' item in localStorage with the updated cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
