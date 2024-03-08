import React, { useEffect } from "react";
import "../app/globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import { CartProvider } from "@/app/components/CartContext";

const CartItems: React.FC = () => {
  const { cartItems } = useCart();

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return <></>;
};

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <Navbar />
      <div className="pt-[80px]">
        <CartItems />
      </div>
    </CartProvider>
  );
};

export default CartPage;
