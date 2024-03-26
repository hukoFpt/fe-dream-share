"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { useProduct } from "./ProductContext";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import ProductModal from "./modals/ProductModal";
import useProductModal from "../hooks/useProductModal";
interface ProductProps {
  id: number;
  category: string;
  collection: number;
  code: string;
  name: string;
  description: string;
  highlight: number;
  stock: number;
  size: string;
  color: string;
  status: string;
  price: number;
  image: string;
}

const ProductBox: React.FC<ProductProps> = ({
  id,
  category,
  collection,
  code,
  name,
  description,
  highlight,
  stock,
  size,
  color,
  status,
  price,
  image,
}) => {
  const productModal = useProductModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewDetails = () => {
    localStorage.setItem(
      "currentProduct",
      JSON.stringify({
        id,
        category,
        collection,
        code,
        name,
        description,
        highlight,
        size,
        color,
        status,
        price,
        stock,
        image,
      })
    );
    console.log(
      "Product is added",
      JSON.stringify({
        id,
        category,
        collection,
        code,
        name,
        description,
        highlight,
        size,
        color,
        status,
        price,
        stock,
        image,
      })
    );
    productModal.onOpen();
  };

  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { setProduct } = useProduct();
  return (
    <div>
      <div className="flex flex-col items-center max-w-[400px]">
        <div className="group w-full relative h-64">
          <Image
            layout="fill"
            objectFit="cover"
            className="object-cover rounded transition group-hover:opacity-50"
            alt=""
            src={image}
          ></Image>
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {stock < 1 ? (
              <div
                className="
                  relative
                  text-center
                  text-white
                  font-bold
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  rounded-lg
                  transition
                  w-1/2
                bg-neutral-500
                  my-3
                  py-2"
              >
                Out of Stock
              </div>
            ) : (
              <button
                className={`
              relative
              disabled:opacity-70
              disabled:cursor-not-allowed
              rounded-lg
              hover:opacity-80
              transition
              w-1/2
              bg-rose-500
              my-3
              `}
                onClick={() => {
                  addToCart({
                    id,
                    category,
                    collection,
                    code,
                    name,
                    description,
                    highlight,
                    size,
                    color,
                    stock,
                    status,
                    price,
                    image,
                  });
                  setIsAdded(true);
                  setTimeout(() => setIsAdded(false), 1500);
                }}
              >
                <div
                  className="
                text-white
                font-bold
                py-2
              "
                >
                  {isAdded ? "Added!" : "Add to Cart"}
                </div>
              </button>
            )}
            <div>Stock: {stock}</div>
            <button onClick={handleViewDetails}>View Details</button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-neutral-500 font-light text-sm pt-1">
            {category}
          </div>
          <div className="text-rose-500 font-bold text-lg">{name}</div>
          <div className="text-neutral-800 text-lg font-bold">${price}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductBox;
