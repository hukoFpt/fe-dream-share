"use client";

import useCheckoutModal from "@/app/hooks/useCheckoutModal";
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../CartContext";

const CheckoutModal = () => {
  const checkoutModal = useCheckoutModal();
  const onToggle = useCallback(() => {
    checkoutModal.onClose();
    checkoutModal.onOpen();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

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
        <div className="flex flex-row">
          <div className="w-3/5 flex flex-col">
            <div className="text-xl font-bold px-2">Dream Share</div>
            <div className="text-lg font-bold px-2 pt-2">
              Billing Information
            </div>
            <div className="px-3 py-1">
              <label htmlFor="name">* Full Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                type="text"
                id="name"
                name="name"
              ></input>
            </div>
            <div className="flex flex-row">
              <div className="px-3 py-1 w-3/5">
                <label htmlFor="email">* Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  type="text"
                  id="email"
                  name="email"
                ></input>
              </div>
              <div className="px-3 py-1 w-2/5">
                <label htmlFor="phone">* Phone</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  type="text"
                  id="phone"
                  name="phone"
                ></input>
              </div>
            </div>
            <div className="px-3 py-1">
              <label htmlFor="address">* Address</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                type="text"
                id="address"
                name="name"
              ></input>
            </div>
            <div className="text-lg font-bold px-2 pt-2">Payment Methods</div>
            <div className="p-2">
              <div className="p-2 flex aligh-center border rounded-t-xl">
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value="option1"
                  defaultChecked
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={handleChange}
                />
                <label htmlFor="option1" className="ml-2 text-gray-700">
                  Cash on Delivery
                </label>
              </div>
              <div className="p-2 flex aligh-center border">
                <input
                  type="radio"
                  id="option2"
                  name="options"
                  value="option2"
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={handleChange}
                />
                <label htmlFor="option2" className="ml-2 text-gray-700">
                  DreamShare Wallet Balance
                </label>
                {selectedOption === "option2" && (
                  <div>You selected Option 2!</div>
                )}
              </div>
              <div className="p-2 flex aligh-center border">
                <input
                  type="radio"
                  id="option3"
                  name="options"
                  value="option3"
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={handleChange}
                />
                <label htmlFor="option3" className="ml-2 text-gray-700">
                  Bank Transfer
                </label>
                {selectedOption === "option3" && (
                  <div>You selected Option 3!</div>
                )}
              </div>
              <div className="p-2 flex aligh-center border rounded-b-xl">
                <input
                  type="radio"
                  id="option4"
                  name="options"
                  value="option4"
                  className="form-radio h-5 w-5 text-blue-600"
                  onChange={handleChange}
                />
                <label htmlFor="option4" className="ml-2 text-gray-700">
                  Internet Banking
                </label>
                {selectedOption === "option4" && (
                  <div>You selected Option 4!</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col pr-2">
            <div className="text-xl font-bold text-center">Order Summary</div>
            <div>
              <table className="w-full border-2 ">
                <tr className="border-2 w-full">
                  <th className="w-3/6 px-1 border-l-2">Product</th>
                  <th className="w-1/6 px-1 border-l-2">QTY.</th>
                  <th className="w-2/6 px-1 border-l-2">Price</th>
                </tr>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 px-1">{item.name}</td>
                    <td className="border-2 text-center px-1">
                      {item.quantity}
                    </td>
                    <td className="border-2 text-right px-1">
                      USD ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border-2 px-1 text-xl" colSpan="2">
                    Subtotal
                  </td>
                  <td className=" text-right p-1">USD ${totalPrice}</td>
                </tr>
                <tr>
                  <td className=" px-1 text-xl" colSpan="2">
                    Shipping
                  </td>
                  <td className="border-2 text-right p-1">USD $0</td>
                </tr>
                <tr>
                  <td className="border-2 font-black px-1 text-xl" colSpan="2">
                    Total
                  </td>
                  <td className="border-2 text-right p-1">USD ${totalPrice}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
