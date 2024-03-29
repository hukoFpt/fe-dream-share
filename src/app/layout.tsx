import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import Footer from "./components/footer/Footer";
import CartModal from "./components/modals/CartModal";
import ProductModal from "./components/modals/ProductModal";
import CheckoutModal from "./components/modals/CheckOutModal";
import WalletModal from "./components/modals/WalletModal";

export const metadata = {
  title: "Dream Share",
  description: "Dream Share",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <CartModal />
          <CheckoutModal />
          <WalletModal />
          <ProductModal />
          <Navbar />
          <main>{children}</main>
        </ClientOnly>
      </body>
    </html>
  );
}
