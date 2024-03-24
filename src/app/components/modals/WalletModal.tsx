"use client";

import useWalletModal from "@/app/hooks/useWalletModal";
import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { IoMdExit } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMastercardLine } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";
import { createCharge } from "@/app/api/deposit";
import Stripe from "stripe";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const WalletModal = () => {
  const stripe = new Stripe(
    "sk_test_51Ovv7xEjdC9lsUQTv6ruzr9dDpF8ldYbEVzbBq7YkHXaouLPFg017XTnkNxsMy40faSzHwuZUTxElOhJKzRBQCJC00IGRiDJ1a"
  );
  const currentUser = localStorage.getItem("currentUser");
  let user;
  if (currentUser && typeof currentUser === "string") {
    try {
      user = JSON.parse(currentUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  } else {
    console.log("No user is currently logged in");
  }
  const walletModal = useWalletModal();
  const [isOpen, setIsOpen] = useState(false);

  if (!walletModal.isOpen) {
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
      <div className="flex flex-col bg-white border rounded-xl w-2/6 relative">
        <div className="text-rose-500 text-2xl font-bold text-center py-2">
          Your Wallet
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
          onClick={walletModal.onClose}
        >
          x
        </button>
        <div className="flex flex-col">
          <div className="flex">
            <img
              className="w-14 h-14 rounded-full mx-2"
              src={user.avatar}
            ></img>
            <div>
              <div className="font-bold text-xl">{user.name}</div>
              <div className="px-2 font-semibold text-neutral-500 border-2 border-neutral-500 bg-neutral-200 rounded-full">
                Customer
              </div>
            </div>
          </div>
          <div className="text-center pt-2">Current Balance</div>
          <div className="flex flex-row items-center justify-center">
            <div className="font-semibold">$</div>
            <div className="text-3xl font-bold px-2">
              {Number(user.balance).toLocaleString()}
            </div>
            <div className="font-semibold">USD</div>
          </div>
          <div className="flex justify-center gap-3 font-bold text-lg">
            Add Funds
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <PayPalButton
              amount="0.01"
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderId: data.orderID,
                  }),
                });
              }}
              options={{
                clientId: "ARp0fpJBdtNGb42tOIt6eo8PFr9msuASKL5EzCP9pmJuYDDCI-Wusa9mRFAixVwPg73RgtVRieqWgbxs",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
