"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    "aboutUs",
    "termOfService",
    "shippingService",
    "returnPolicy",
    "privacyPolicy",
    "contactUs",
  ];
  return (
    <div className="px-4 border-t border-t-gray-200 py-4 flex flex-col justify-between w-full text-sm z-50 bg-white items-center">
      <ul className="flex gap-3 font-normal mb-auto">
        <li>&copy; {new Date().getFullYear()} DreamShare</li>
        {links.map((link) => (
          <li key={link}>
            {" "}
            <Link href="#">
              {link.charAt(0).toUpperCase() + link.slice(1).toLowerCase}
            </Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
