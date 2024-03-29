/* eslint-disable @next/next/no-img-element */
"use client";

import useCartModal from "@/app/hooks/useCartModal";
import useCheckoutModal from "@/app/hooks/useCheckoutModal";

import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartModal = () => {
  // Cart Items
  const cartModal = useCartModal();
  const checkoutModal = useCheckoutModal();
  const CartOnToggle = useCallback(() => {
    cartModal.onClose();
    cartModal.onOpen();
  }, []);
  const removeFromCart = (itemToRemove: never) => {
    // Get the current cart items from localStorage
    const currentCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    // Remove the item from the current cart items
    const updatedCartItems = currentCartItems.filter(
      (item: { id: any }) => item.id !== itemToRemove.id
    );
    // Update the 'cartItems' item in localStorage with the updated cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // Update the cartItems state
    setCartItems(updatedCartItems);
  };
  const updateQuantity = (itemToUpdate: any, quantity: number) => {
    const currentCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    const updatedCartItems = currentCartItems.map((item: any) =>
      item.id === itemToUpdate.id ? { ...item, quantity } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (cartModal.isOpen) {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [cartModal.isOpen]);
  const handleCheckout = () => {
    cartModal.onClose();
    checkoutModal.onOpen();
  };
  if (!cartModal.isOpen) {
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
      <div className="flex flex-col bg-white border rounded-xl w-2/5 relative">
        <div className="text-rose-500 text-xl font-bold text-center py-2">
          Your Cart
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
          onClick={cartModal.onClose}
        >
          x
        </button>
        {cartItems.length > 0 ? (
          <div>
            <table className="border w-full h-8">
              {cartItems.map((item) => (
                <tbody key={item.id} className="flex flex-row">
                  <tr>
                    <td className="align-top p-2 w-1/5">
                      <img src={item.image} alt={item.title} />
                    </td>
                    <td className="align-top p-2 w-3/5">
                      <div className="font-sm text-neutral-400">
                        {item.collection}
                      </div>
                      <div>{item.name}</div>
                    </td>
                    <td className="align-middle p-2 w-1/5">
                      <input
                        type="number"
                        min="1"
                        className="text-center w-3/5 border-2 border-neutral-500 rounded-md"
                        value={item.quantity}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value);
                          if (quantity < 1) {
                            e.target.value = "1";
                            updateQuantity(item, 1);
                          } else {
                            updateQuantity(item, quantity);
                          }
                        }}
                      ></input>
                    </td>
                    <td className="align-middle p-2 w-1/5">
                      <button onClick={() => removeFromCart(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className="text-center w-full bg-rose-500 text-white py-2 text-lg font-bold rounded-b-xl">
              <button onClick={handleCheckout}>Go to Checkout</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="my-4"
              width="120"
              height="76"
              viewBox="0 0 142 76"
              fill="none"
            >
              <path
                d="M76.2391 54.408C76.2391 55.912 76.0751 57.216 75.7471 58.32C75.4271 59.416 74.9871 60.324 74.4271 61.044C73.8671 61.764 73.2031 62.3 72.4351 62.652C71.6751 63.004 70.8591 63.18 69.9871 63.18C69.1071 63.18 68.2871 63.004 67.5271 62.652C66.7751 62.3 66.1191 61.764 65.5591 61.044C64.9991 60.324 64.5591 59.416 64.2391 58.32C63.9191 57.216 63.7591 55.912 63.7591 54.408C63.7591 52.904 63.9191 51.6 64.2391 50.496C64.5591 49.392 64.9991 48.48 65.5591 47.76C66.1191 47.032 66.7751 46.492 67.5271 46.14C68.2871 45.788 69.1071 45.612 69.9871 45.612C70.8591 45.612 71.6751 45.788 72.4351 46.14C73.2031 46.492 73.8671 47.032 74.4271 47.76C74.9871 48.48 75.4271 49.392 75.7471 50.496C76.0751 51.6 76.2391 52.904 76.2391 54.408ZM74.0191 54.408C74.0191 53.096 73.9071 51.996 73.6831 51.108C73.4671 50.212 73.1711 49.492 72.7951 48.948C72.4271 48.404 71.9991 48.016 71.5111 47.784C71.0231 47.544 70.5151 47.424 69.9871 47.424C69.4591 47.424 68.9511 47.544 68.4631 47.784C67.9751 48.016 67.5471 48.404 67.1791 48.948C66.8111 49.492 66.5151 50.212 66.2911 51.108C66.0751 51.996 65.9671 53.096 65.9671 54.408C65.9671 55.72 66.0751 56.82 66.2911 57.708C66.5151 58.596 66.8111 59.312 67.1791 59.856C67.5471 60.4 67.9751 60.792 68.4631 61.032C68.9511 61.264 69.4591 61.38 69.9871 61.38C70.5151 61.38 71.0231 61.264 71.5111 61.032C71.9991 60.792 72.4271 60.4 72.7951 59.856C73.1711 59.312 73.4671 58.596 73.6831 57.708C73.9071 56.82 74.0191 55.72 74.0191 54.408Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.7635 23.3713C63.9442 21.136 66.9079 19.875 70.0042 19.875C73.1005 19.875 76.0642 21.136 78.2449 23.3713C80.4247 25.6056 81.6445 28.6303 81.6445 31.7784V34.5519H88.7802C89.2445 34.5404 89.6915 34.7107 90.0308 35.0212C90.3702 35.3318 90.5756 35.7579 90.6139 36.2098L94.0924 69.0123C94.17 69.7311 94.1088 70.4587 93.9119 71.1539C93.715 71.8492 93.3859 72.4994 92.9423 73.067C92.4986 73.6348 91.9488 74.1091 91.3232 74.4615C90.6975 74.8141 90.0089 75.0374 89.2967 75.1179C89.2548 75.1226 89.2126 75.125 89.1705 75.125H51.3104C49.8678 75.125 48.4895 74.5396 47.4752 73.5058C46.4713 72.4828 45.9038 71.1032 45.8852 69.6649C45.8706 69.4576 45.8717 69.2496 45.8884 69.0425C45.8892 69.0329 45.8901 69.0233 45.8911 69.0137L49.3946 36.2094C49.433 35.7576 49.6384 35.3317 49.9777 35.0212C50.317 34.7107 50.764 34.5404 51.2283 34.5519H58.3639V31.7784C58.3639 28.6303 59.5837 25.6056 61.7635 23.3713ZM59.4777 36.8019C59.4815 36.8019 59.4852 36.8019 59.4889 36.8019C59.4927 36.8019 59.4964 36.8019 59.5001 36.8019H80.5084C80.5121 36.8019 80.5158 36.8019 80.5195 36.8019C80.5233 36.8019 80.527 36.8019 80.5307 36.8019H88.4141L91.8551 69.2518L91.8554 69.254C91.9021 69.6863 91.8652 70.1237 91.747 70.5408C91.6289 70.9578 91.4322 71.3453 91.1695 71.6816C90.9067 72.0178 90.5833 72.2958 90.2187 72.5013C89.8714 72.697 89.4926 72.8234 89.1022 72.875H51.3103C50.4803 72.875 49.6783 72.5386 49.0811 71.93C48.483 71.3204 48.1397 70.4872 48.1348 69.611C48.1346 69.5828 48.1334 69.5547 48.1311 69.5266C48.1233 69.4301 48.123 69.3331 48.1301 69.2366L51.5942 36.8019H59.4777ZM79.3945 34.5519H60.6139V31.7784C60.6139 29.2093 61.6098 26.7509 63.3741 24.9425C65.1373 23.1351 67.5229 22.125 70.0042 22.125C72.4856 22.125 74.8711 23.1351 76.6344 24.9425C78.3986 26.7509 79.3945 29.2093 79.3945 31.7784V34.5519Z"
                fill="currentColor"
              ></path>
              <path
                d="M133.427 30.37C134.358 30.37 135.112 29.6156 135.112 28.685C135.112 27.7544 134.358 27 133.427 27C132.496 27 131.742 27.7544 131.742 28.685C131.742 29.6156 132.496 30.37 133.427 30.37Z"
                fill="currentColor"
              ></path>
              <path
                d="M133.427 43.853C134.358 43.853 135.112 43.0986 135.112 42.168C135.112 41.2374 134.358 40.483 133.427 40.483C132.496 40.483 131.742 41.2374 131.742 42.168C131.742 43.0986 132.496 43.853 133.427 43.853Z"
                fill="currentColor"
              ></path>
              <path
                d="M140.167 37.1122C141.098 37.1122 141.852 36.3578 141.852 35.4272C141.852 34.4966 141.098 33.7422 140.167 33.7422C139.237 33.7422 138.482 34.4966 138.482 35.4272C138.482 36.3578 139.237 37.1122 140.167 37.1122Z"
                fill="currentColor"
              ></path>
              <path
                d="M126.685 37.112C127.616 37.112 128.37 36.3576 128.37 35.427C128.37 34.4964 127.616 33.742 126.685 33.742C125.754 33.742 125 34.4964 125 35.427C125 36.3576 125.754 37.112 126.685 37.112Z"
                fill="currentColor"
              ></path>
              <path
                d="M5.85958 46.5797C6.61676 46.2426 6.95725 45.3554 6.62008 44.5982C6.28291 43.8411 5.39576 43.5006 4.63858 43.8377C3.88139 44.1749 3.54091 45.0621 3.87808 45.8192C4.21524 46.5764 5.10239 46.9169 5.85958 46.5797Z"
                fill="currentColor"
              ></path>
              <path
                d="M10.7404 57.5417C11.4976 57.2045 11.8381 56.3173 11.5009 55.5602C11.1638 54.803 10.2766 54.4625 9.51943 54.7997C8.76225 55.1368 8.42177 56.024 8.75893 56.7812C9.0961 57.5383 9.98325 57.8788 10.7404 57.5417Z"
                fill="currentColor"
              ></path>
              <path
                d="M13.7815 49.6198C14.5386 49.2826 14.8791 48.3955 14.542 47.6383C14.2048 46.8811 13.3176 46.5406 12.5605 46.8778C11.8033 47.215 11.4628 48.1021 11.8 48.8593C12.1371 49.6165 13.0243 49.957 13.7815 49.6198Z"
                fill="currentColor"
              ></path>
              <path
                d="M2.81856 54.5006C3.57574 54.1635 3.91623 53.2763 3.57906 52.5191C3.24189 51.762 2.35474 51.4215 1.59756 51.7586C0.840377 52.0958 0.49989 52.983 0.837059 53.7401C1.17423 54.4973 2.06138 54.8378 2.81856 54.5006Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.4885 49.077C3.78538 48.3036 3.39908 47.4359 2.62568 47.139C1.85228 46.8422 0.984638 47.2285 0.687757 48.0019C0.390875 48.7753 0.777172 49.6429 1.55058 49.9398C2.32398 50.2367 3.19162 49.8504 3.4885 49.077Z"
                fill="currentColor"
              ></path>
              <path
                d="M14.6918 53.3772C14.9887 52.6038 14.6024 51.7361 13.829 51.4392C13.0556 51.1424 12.1879 51.5287 11.8911 52.3021C11.5942 53.0755 11.9805 53.9431 12.7539 54.24C13.5273 54.5369 14.3949 54.1506 14.6918 53.3772Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.2406 45.6257C11.5375 44.8523 11.1512 43.9847 10.3778 43.6878C9.60441 43.3909 8.73677 43.7772 8.43989 44.5506C8.14301 45.324 8.52931 46.1916 9.30271 46.4885C10.0761 46.7854 10.9438 46.3991 11.2406 45.6257Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.93977 56.8286C7.23665 56.0552 6.85036 55.1876 6.07695 54.8907C5.30355 54.5938 4.43591 54.9801 4.13903 55.7535C3.84215 56.5269 4.22845 57.3946 5.00185 57.6915C5.77525 57.9883 6.64289 57.6021 6.93977 56.8286Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.457 9.67676H32.354V11.6768H23.457V9.67676Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.6782 8.897V0H22.6782V8.897H20.6782Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.6782 21.3531V12.4561H22.6782V21.3531H20.6782Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 9.67676H19.897V11.6768H11V9.67676Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M102.215 7.18408H107.368V9.18408H102.215V7.18408Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M100.184 7.153V2H102.184V7.153H100.184Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M100.184 14.3669V9.21387H102.184V14.3669H100.184Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M95 7.18408H100.153V9.18408H95V7.18408Z"
                fill="currentColor"
              ></path>
            </svg>
            <div className="text-3xl font-bold text-center">
              Your cart is empty
            </div>
            <div className="text-center font-light pb-2">
              You have not added any cart items yet.
            </div>
            <div className="text-center w-full bg-rose-500 text-white py-2 text-lg font-bold rounded-b-xl">
              <button onClick={cartModal.onClose}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartModal;
