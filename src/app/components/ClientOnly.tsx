"use client";

import React, { useState, useEffect } from "react";
import { CartProvider } from "./CartContext";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <CartProvider>{children}</CartProvider>;
};

export default ClientOnly;
