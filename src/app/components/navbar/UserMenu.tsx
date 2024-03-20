"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import UseRegisterModal from "@/app/hooks/useRegisterModal";
import UseLoginModal from "@/app/hooks/useLoginModal";
import UseCartModal from "@/app/hooks/useCartModal";
import UseWalletModal from "@/app/hooks/useWalletModal";
import { useRouter } from "next/navigation";

const UserMenu = () => {
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
  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  const registerModal = UseRegisterModal();
  const loginModal = UseLoginModal();
  const cartModal = UseCartModal();
  const walletModal = UseWalletModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const router = useRouter();
  return (
    <div className="relative z-20">
      <div className="flex flex-row items-center gap-3">
        {user && user.role_id === 1 && (
          <>
            <div
              onClick={walletModal.onOpen}
              className="
                flex flex-row
                md:block
                sm:hidden
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer"
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <div>Balance: USD ${user.balance}</div>
                <div
                  className="
                  bg-rose-500
                  text-white
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                >
                  +
                </div>
              </div>
            </div>
            <div
              onClick={cartModal.onOpen}
              className="
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
            "
            >
              Cart
            </div>
          </>
        )}
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hower:shadow-md
                transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[20vh]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {!user && (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Sign In" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                </>
              )}
              {user && user.role_id === 1 && (
                <>
                  <MenuItem onClick={() => {}} label={user.name} />
                  <MenuItem onClick={handleSignOut} label="Sign Out" />
                </>
              )}
              {user && user.role_id === 2 && (
                <>
                  <MenuItem
                    onClick={() => router.push("http://localhost:3001/console")}
                    label="Admin Console"
                  />
                  <MenuItem onClick={() => {}} label={user.name} />
                  <MenuItem onClick={handleSignOut} label="Sign Out" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
