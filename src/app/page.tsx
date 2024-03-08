"use client";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Product from "./components/Product";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

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
    <div style={{ paddingTop }}>
      <Product />
    </div>
  );
}
