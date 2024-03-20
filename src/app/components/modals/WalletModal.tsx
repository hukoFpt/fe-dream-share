"use client";

import useWalletModal from "@/app/hooks/useWalletModal";
import React, { useCallback, useEffect, useState } from "react";

import { IoMdExit } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMastercardLine } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";
import { createCharge } from "@/app/api/deposit";
import Stripe from "stripe";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const WalletModal = () => {
  const stripe = new Stripe(
    "sk_test_51Ovv7xEjdC9lsUQTv6ruzr9dDpF8ldYbEVzbBq7YkHXaouLPFg017XTnkNxsMy40faSzHwuZUTxElOhJKzRBQCJC00IGRiDJ1a"
  );
  const currentUser = localStorage.getItem("currentUser");
  let user;
  if (currentUser && typeof currentUser === "string") {
    try {
      user = JSON.parse(currentUser);
      console.log(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  } else {
    console.log("No user is currently logged in");
  }
  const walletModal = useWalletModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isDepositClicked, setIsDepositClicked] = useState(false);
  const [isWithdrawClicked, setIsWithdrawClicked] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const [cardNumber, setCardNumber] = useState("");
  const handleCardNumberChange = (event) => {
    let formattedInput = event.target.value.replace(/\D/g, "").substring(0, 16);
    formattedInput = formattedInput.replace(/(\d{4})/g, "$1 - ").trim();
    if (formattedInput.endsWith("-")) {
      formattedInput = formattedInput.slice(0, -1);
    }
    setCardNumber(formattedInput);
    if (!validateCreditCardNumber(event.target.value)) {
      console.log("Invalid card number");
    }
  };
  const [cardHolder, setCardHolder] = useState("");
  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value.toUpperCase());
  };
  const [isDateValid, setIsDateValid] = useState(true);
  const [expiryDate, setExpiryDate] = useState("");
  const validateExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split(" / ").map(Number);
    const expiry = new Date(year + 2000, month - 1); // months are 0-indexed in JavaScript
    const now = new Date();
    now.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
    return expiry >= now;
  };
  function validateCreditCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
  const handleExpiryDateChange = (event) => {
    let formattedInput = event.target.value.replace(/\D/g, "").substring(0, 4);
    formattedInput = formattedInput.replace(/(\d{2})/, "$1 / ");
    if (formattedInput.endsWith(" / ")) {
      formattedInput = formattedInput.slice(0, -3);
    }
    setExpiryDate(formattedInput);
    if (!validateExpiryDate(formattedInput)) {
      console.log("Invalid expiry date");
    }
    setIsDateValid(validateExpiryDate(formattedInput));
  };

  const createPayment = async () => {
    try {
      const response = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/payments/payment",
        {
          intent: "sale",
          payer: {
            payment_method: "credit_card",
            funding_instruments: [
              {
                credit_card: {
                  number: "4032035742984065",
                  type: "visa",
                  expire_month: "04",
                  expire_year: "2029",
                  cvv2: "480",
                  first_name: "John",
                  last_name: "Doe",
                },
              },
            ],
          },
          transactions: [
            {
              amount: {
                total: "7.47",
                currency: "USD",
              },
              description: "This is the payment transaction description.",
            },
          ],
        },
        {
          auth: {
            username: "sb-ggzhb30066589_api1.business.example.com",
            password: "KNR2UDVN6L57LDJL",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="flex justify-center gap-3 py-2">
            <div className="flex flex-row align-middle justify-center border-2 border-rose-500 bg-rose-200 px-2 py-1 rounded-xl w-40 gap-1">
              <div
                className="text-rose-600 font-bold text-center cursor-pointer"
                onClick={() => {
                  setIsDepositClicked(true);
                  setIsWithdrawClicked(false);
                }}
              >
                Add Funds
              </div>
              <IoMdExit size={24} className="text-rose-600" />
            </div>
          </div>
          {isDepositClicked && !isWithdrawClicked && (
            <div className="flex flex-col items-center">
              <div>Deposit with Card</div>
              <div className="border-2 border-rose-500 rounded-xl w-4/5 h-48">
                <div className="flex flex-row items-center gap-2 justify-end px-2">
                  <RiMastercardLine size={24} />
                  <RiVisaLine size={36} />
                </div>
                <div className="px-2 pt-2">
                  <div>Card Number</div>
                  <input
                    type="text"
                    value={cardNumber}
                    placeholder="XXXX - XXXX - XXXX - XXXX"
                    onChange={handleCardNumberChange}
                    className="
                        w-2/3
                        h-5
                        font-semibold
                      "
                  ></input>
                </div>
                <div className="flex flex-row px-2 pt-6 gap-3">
                  <div>
                    <div>Card Holder</div>
                    <input
                      type="text"
                      value={cardHolder}
                      placeholder="JOHN SMITH"
                      onChange={handleCardHolderChange}
                      className="
                                w-40
                                h-5
                                font-semibold
                            "
                    ></input>
                  </div>
                  <div>
                    <div>Exp. Date</div>
                    <input
                      type="text"
                      value={expiryDate}
                      placeholder="MM / YY"
                      onChange={handleExpiryDateChange}
                      className="w-20 h-5 font-semibold"
                    ></input>
                  </div>
                  <div>
                    <div>CVV</div>
                    <input
                      type="text"
                      placeholder="XXX"
                      className="w-10 h-5 font-semibold"
                    ></input>
                  </div>
                </div>
                {!isDateValid && (
                  <div className="text-red-500 px-2">*Invalid date</div>
                )}
              </div>
              <div>
                <div className="text-center">Billing Information</div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <div>Amount</div>
                    <input
                      type="text"
                      placeholder="100"
                      className="w-16 h-5 font-semibold text-right"
                    ></input>
                    <div>$ USD {"(10% deposit bonus)"}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div>
                    <div>First name</div>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-20 h-5 font-semibold"
                    ></input>
                  </div>
                  <div>
                    <div>Last name</div>
                    <input
                      type="text"
                      placeholder="Smith"
                      className="w-20 h-5 font-semibold"
                    ></input>
                  </div>
                  <div>
                    <div>City</div>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-40 h-5 font-semibold"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div>
                    <div>Billing Address</div>
                    <input
                      type="text"
                      placeholder="123 Main St"
                      className="w-40 h-5 font-semibold"
                    ></input>
                  </div>
                  <div className="px-3">
                    <div>Postal Code</div>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-20 h-5 font-semibold"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center px-8 mb-2 align-middle">
                <div className="text-sm font-light">
                  {
                    "You'll have a chance to review your order before it's placed."
                  }
                </div>
                <button
                  className="bg-rose-500 text-white px-2 py-1 rounded-lg w-1/3 text-center cursor-pointer"
                  onClick={() => createPayment()}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
