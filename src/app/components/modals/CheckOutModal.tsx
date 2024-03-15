"use client";

import useCheckoutModal from "@/app/hooks/useCheckoutModal";
import React, { useCallback, useEffect, useState } from "react";

const CheckoutModal = () => {
  const checkoutModal = useCheckoutModal();
  const onToggle = useCallback(() => {
    checkoutModal.onClose();
    checkoutModal.onOpen();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  if (!checkoutModal.isOpen) {
    return null;
  }
  return (
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
      <div className="flex flex-col bg-white border rounded-xl w-4/5 relative">
        <div className="text-rose-500 text-2xl font-bold text-center py-2">
          Checkout
        </div>
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
          onClick={checkoutModal.onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
