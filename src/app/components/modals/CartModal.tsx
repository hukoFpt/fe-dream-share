"use client";

import useCartModal from "@/app/hooks/useCartModal";
import React, { useCallback, useState } from "react";
import { useCart } from "../CartContext";

const CartModal = () => {
    // Cart Items
    const { removeFromCart } = useCart();
    const { updateQuantity } = useCart();
    const handleRemoveFromCart = (item: any) => {
      removeFromCart(item);
      console.log("Item removed from cart");
    };
    const { cartItems } = useCart();

  const cartModal = useCartModal();
  const onToggle = useCallback(() => {
    cartModal.onClose();
    cartModal.onOpen();
  }, [cartModal]);

  console.log("Rendering CartModal, isOpen:");
  if (!cartModal.isOpen) {
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
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
        >
          <div
            className={`
            translate
            duration-300
            h-full
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              <div className="text-center text-rose-500 font-bold text-xl py-3">Your Cart</div>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <div>{item.label}</div>
                  <div>{item.price}</div>
                  {/* Render other item properties as needed */}
                </div>
              ))}
              <button onClick={cartModal.onClose} className="text-white bg-rose-500 w-full rounded-b-lg text- py-2">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
