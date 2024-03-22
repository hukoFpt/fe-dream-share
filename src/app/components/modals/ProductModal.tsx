"use client";
import { useCart } from "../CartContext";
import Image from "next/image";
import UseProductModal from "@/app/hooks/useProductModal";
import React, { useCallback, useEffect, useState } from "react";

interface ProductProps {
  product: {
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
  };
}

const ProductModal: React.FC = () => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const handleInputChange = (event: { target: { value: string } }) => {
    setQuantity(parseInt(event.target.value));
  };
  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClose = () => {
    localStorage.removeItem("currentProduct");
    productModal.onClose();
  };

  const [products, setProducts] = useState(null);
  const productModal = UseProductModal();

  useEffect(() => {
    const storedProduct = localStorage.getItem("currentProduct");
    if (storedProduct) {
      setProducts(JSON.parse(storedProduct));
      console.log("Retrieved product from local storage", storedProduct);
    }
  }, [productModal.isOpen]);

  console.log("Rendering CartModal, isOpen:", products);
  if (!productModal.isOpen || !products) {
    return null;
  }
  return (
    <>
      <div
        className="
            justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            bg-neutral-800/70
          "
      >
        <div
          className="
              flex
              flex-col md:flex-row
              h-[80vh]
            "
        >
          <div
            style={{ backgroundImage: `url(${products.image})` }}
            className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none w-full md:w-[80vh] h-[40vh] md:h-[80vh] bg-center bg-cover"
          ></div>

          <div className="flex-1 p-4 bg-white rounded-b-xl md:rounded-r-xl md:rounded-b-none w-full md:w-[100vh] relative">
            <button
              className="
                    px-3
                    py-1
                    border-0 
                    hover:opacity-70
                    absolute
                    top-0
                    right-0 
                    transition
                  "
              onClick={handleClose}
            >
              x
            </button>
            <div className="text-2xl font-bold mb-2 text-rose-500">
              {products.name}
            </div>
            <p className="text-sm mb-2 font-light">SKU: {products.code}</p>
            <div className="py-4 text-xl font-extrabold border-t border-b border-dotted border-gray-500">
              {products.price.toLocaleString()} $USD
            </div>
            <div className="py-2 overflow-auto h-80">
              {products.description}
            </div>
            <div className="flex flex-row">
              <div>
                <button
                  className="text-white text-2xl text-bold border rounded-l-lg bg-rose-500 w-6 h-10 border-rose-500"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  className="text-center text-2xl text-bold w-12 h-10 border border-rose-500"
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <button
                  className="text-white text-2xl text-bold border rounded-r-lg bg-rose-500 w-6 h-10 border-rose-500"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="mx-4 px-4 text-white text-2xl text-bold bg-rose-500 w-full h-10 rounded-lg"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductModal;
