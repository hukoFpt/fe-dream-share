import React, { createContext, useState, useContext, useEffect } from "react";

interface productProps {
  id: number;
  category: number;
  collection: number;
  code: string;
  name: string;
  description: string;
  highlight: number;
  size: string;
  color: string;
  status: string;
  price: number;
  image: string;
}

interface ProductContextData {
  products: productProps[];
  setProduct: (product: any) => void;
  clearAllProducts: () => void;
}

const ProductContext = createContext<ProductContextData | undefined>(undefined);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<any[]>(() => {
    // Get the cart items from local storage when initializing the state
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      return storedProducts ? JSON.parse(storedProducts) : [];
    }
  });

  const setProduct = (item: any) => {
    clearAllProducts();
    const currentProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const updatedProducts = [...currentProducts, item];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const clearAllProducts = () => {
    localStorage.removeItem("products");
    setProducts([]);
  };

  return (
    <ProductContext.Provider value={{ products, setProduct, clearAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a useProduct");
  }
  return context;
};

export { ProductProvider, useProduct };
