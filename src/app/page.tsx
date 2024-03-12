"use client";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Product from "./components/Product";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import { CartProvider } from "./components/CartContext";
import { ProductProvider } from "./components/ProductContext";

export default function Home() {
  const [paddingTop, setPaddingTop] = useState("470px");
  const handleScroll = () => {
    // Change the padding-top value based on the scroll position
    if (window.scrollY > 50) {
      setPaddingTop("300px");
    } else {
      setPaddingTop("470px");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CartProvider>
      <ProductProvider>
        <div style={{ paddingTop }}>
          <Product />
        </div>
      </ProductProvider>
    </CartProvider>
  );
}
